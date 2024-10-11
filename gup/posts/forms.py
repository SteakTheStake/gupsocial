from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
  content = FileField('Upload Video or Photo', validators=[
      DataRequired(),
      FileAllowed(['mp4', 'mov', 'heic', 'jpg', 'png'], 'Only mp4, mov, heic, jpg, or png files allowed.')
  ])
  description = TextAreaField('Description')
  submit = SubmitField('Post')