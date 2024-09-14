from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, FileField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = FileField(u'Image', validators=[FileRequired()])
    description = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Post')

content = FileField('Upload', [
        FileAllowed(['jpg', 'jpeg', 'png'],
                    'Only "jpg", "jpeg" and "png" files are supported')
    ])