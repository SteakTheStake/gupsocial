from flask import url_for, request, render_template, flash, redirect, abort, Blueprint, current_app
from werkzeug.utils import secure_filename
import os
from flask_login import current_user, login_required
from gup import db
from gup.models import Post
from gup.posts.forms import PostForm

posts = Blueprint('posts', __name__)

ALLOWED_EXTENSIONS = {'mp4', 'mov', 'heic', 'jpg', 'png'}

def allowed_file(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@posts.route("/post/new", methods=['GET', 'POST'])
@login_required
def new_post():
  form = PostForm()
  if form.validate_on_submit():
      if form.content.data and allowed_file(form.content.data.filename):
          filename = secure_filename(form.content.data.filename)
          user_dir = os.path.join(current_app.root_path, 'static', 'user_content', current_user.username)
          os.makedirs(user_dir, exist_ok=True)
          file_path = os.path.join(user_dir, filename)
          form.content.data.save(file_path)
          content_file = url_for('static', filename=os.path.join('user_content', current_user.username, filename))
          
          post = Post(content=content_file, description=form.description.data, author=current_user)
          db.session.add(post)
          db.session.commit()
          
          flash('Your post has been created!', 'success')
          return redirect(url_for('main.home'))
      else:
          flash('Invalid file format. Please upload a .mp4, .mov, .heic, .jpg, or .png file.', 'danger')
  
  return render_template('create_post.html', title='New Post', form=form, legend='New Post')

@posts.route("/post/<int:post_id>")
def post(post_id):
  post = Post.query.get_or_404(post_id)
  return render_template('post.html', post=post)

@posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
  post = Post.query.get_or_404(post_id)
  if post.author != current_user:
      abort(403)
  form = PostForm()
  if form.validate_on_submit():
      if form.content.data and allowed_file(form.content.data.filename):
          filename = secure_filename(form.content.data.filename)
          user_dir = os.path.join(current_app.root_path, 'static', 'user_content', current_user.username)
          os.makedirs(user_dir, exist_ok=True)
          file_path = os.path.join(user_dir, filename)
          form.content.data.save(file_path)
          post.content = url_for('static', filename=os.path.join('user_content', current_user.username, filename))
      
      post.description = form.description.data
      db.session.commit()
      flash('Your post has been updated!', 'success')
      return redirect(url_for('posts.post', post_id=post.id))
  elif request.method == 'GET':
      form.description.data = post.description
  return render_template('create_post.html', title='Update Post', form=form, legend='Update Post')

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

# Created/Modified files during execution:
print("posts/routes.py")