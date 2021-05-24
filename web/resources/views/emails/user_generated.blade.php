@component('mail::message')
# Bienvenue sur l'application The Good Fork!

Votre compte The Good Fork a bien été créé.

Votre mot de passe est : {{ $data['password'] }}

Merci de le modifier lors de votre prochaine connexion.

{{ config('app.name') }}
@endcomponent
