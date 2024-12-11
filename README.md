# squibler-test

################ Backned Setup Guidline ################
I'm using Python 3.13.0 for backend. If you don't have 3.13.0 you can pyenv for managing different python version at a time.
Once you done python installation. you need to setup env by commands:

python -m env venv
venv\Scripts\activate -- for windows

after activation of env run the follwoing commands to install project libraries
pip install -r requirements.txt

Once the requirements is installed. You will need to run migrations
python manage.py makemigrations user
python manage.py migrate

Note: you will need set open_api key in settings for GPT.
variable name OPEN_API_KEY = "KEY"

Setup done. You can run the project locally!


################ Frontend Setup Guidline ################
I'm using Node nvm use 20.15.1 and Angular 19. If you don't have 20.15.1 you can nvm for managing different node version at a time.

Once you done node installation. you need to run npm install inside the squibler-frontend directory.

Note: if npm install gives some error try with npm install --force or --legacy-peer-deps


################ Test Guidline ################
You can signup. You will be signup as a viewer. So you won't have access to stats page. You can just view editor and profile.

For admin you need to setup your admin user from python shell in backend project directory.

Let's say you created a user from frontend and you can just get that user and update the role via below commands.

1. python manage.py shell
2. from user.models import User
3. user = User.objects.get(email="test@gmail.com")
4. user.role="admin"
5. user.save()

Now you can login with admin access which can see stats page.

For real time words count. You can login in two private window from first user and write your paragraph for grammar suggesstions and see the stats for admin user window.

