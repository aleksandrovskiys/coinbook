from django import forms

from finances.models import Account, User, Category


class OperationForm(forms.Form):
    TYPE_CHOICES = (
        ('in', 'Income'),
        ('out', 'Outcome'),
    )
    user_id = forms.HiddenInput()
    type = forms.CharField(max_length=3, widget=forms.Select(choices=TYPE_CHOICES))
    account = forms.ModelChoiceField(queryset=Account.objects.none())
    category = forms.ModelChoiceField(queryset=Category.objects.none(), required=False)
    amount = forms.FloatField()
    is_necessary = forms.BooleanField(required=False)

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        forms.Form.__init__(self, *args, **kwargs)
        self.fields['account'].queryset = Account.objects.filter(user=user)
        self.fields['category'].queryset = Category.objects.filter(user=user)
