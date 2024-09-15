from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  content = FileField('Upload Image', validators=[
      FileAllowed(['jpg', 'jpeg', 'png'], 'Only jpg, jpeg and png files are allowed')
  ])
  description = TextAreaField('Description', validators=[DataRequired()])
  submit = SubmitField('Post')
