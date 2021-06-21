# UsersList
The Project mainly focus on login operation and admin operations on the user logs. The logged in user can perform operations over the user log such as Update, delete and even able to create a new user. The steps are as follow to proceed in application.
Login the application using credentials as follow:
Username:eve.holt@reqres.in
Password: cityslicka
After login the auth token is handled and saved in localStorage for no more re-login for each request.
The Logged in user can see the lists of user having their names, email and avatar.
If anyone user from the list is being clicked then the detail view of that user will be displayed in new view.
The logged in user can perform Update and delete operations onthe detailed view user.
The logged in user can also create new user entry.
After successful logout the token related to the user is also removed, so that the user cannot access any page without login
