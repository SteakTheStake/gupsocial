from flask import url_for, request
from werkzeug.utils import secure_filename
import os
from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint, current_app)
from flask_login import current_user, login_required
from gup import db
from gup.models import Post
from gup.posts.forms import PostForm

posts = Blueprint('posts', __name__)

@posts.route("/post/new", methods=['GET', 'POST'])
@login_required
def new_post():
  form = PostForm()
  if form.validate_on_submit():
      if form.content.data:
          filename = secure_filename(form.content.data.filename)
          user_dir = os.path.join(current_app.root_path, 'static', 'user_img', current_user.username)
          os.makedirs(user_dir, exist_ok=True)
          file_path = os.path.join(user_dir, filename)
          form.content.data.save(file_path)
          image_file = url_for('static', filename=f'user_img/{current_user.username}/{filename}')
      else:
          image_file = None

      post = Post(title=form.title.data, content=image_file, description=form.description, author=current_user)
      db.session.add(post)
      db.session.commit()
      flash('Your post has been created!', 'success')
      return redirect(url_for('main.home'))
  return render_template('create_post.html', title='New Post', form=form, legend='New Post')


@posts.route("/post/<int:post_id>")
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', title=post.title, post=post)


@posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('posts.post', post_id=post.id))
    elif request.method == 'GET':
        form.title.data = post.title
        form.content.data = post.content
    return render_template('create_post.html', title='Update Post',
                           form=form, legend='Update Post')


@posts.route("/post/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('main.home'))
