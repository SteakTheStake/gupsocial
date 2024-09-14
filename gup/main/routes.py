from flask import redirect, render_template, request, Blueprint, url_for
from flask_login import current_user
from gup.models import Post
from gup.users import forms
from gup.users.forms import LoginForm

main = Blueprint('main', __name__)


@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=10)
    return render_template('feed.html', posts=posts)


@main.route("/account")
def account():
    return render_template('account.html', title='Account')


@main.route("/map")
def map():
    return render_template('map.html', title='Map')
