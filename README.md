## Love Bug!


## Description

This project was assigned at the end of the eleventh week of General Assembly’s 3-month SEI (Software Engineering Immersive) course, in which I studied the fundamentals of software engineering with the aim to launch a career in this sector. The aim of the project was to show our ability at making an independent full stack app. I decided to, based on the brief given, make a dating site for Entomologists - As they are an underrepresented group. Users can sign up, take a quiz to get paired up and are free to message each other.


-----


## Deployment link:
https://codebyjetmsg.netlify.app/


## Technologies Used:
 - Python | Django for the back-end
 - JavaScript | React | SASS for the front.
 - MUI for styling
 - Development Tools: Visual Code Studio.


## Setup:
Clone both repos locally, then open them in VS code, using:
‘code .’
Then:
- For the backend, run: npm run dev
- For the frontend, run: npm start

---

### Brief:
Below is the brief I received for this final project, I chose to take this on as a solo project:
You are free to work alone or in a group. Both ways have their pros and cons. Remember if you are working in a team that you are all on the same page and working towards the same goal.

Technical Requirements:
Build a full-stack application by making your own back end and your own front-end
Use a Python Django API using Django REST Framework to serve your data from a Postgres database
Consume your API with a separate front-end built with React
Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
Have a visually impressive design to kick your portfolio up a notch
Be deployed online so it's publicly accessible.

Necessary Deliverables

A **working app** hosted on the internet
A **link to your hosted working app** in the URL section of your Github repo
A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
A `readme.md` file** with:
An embedded screenshot of the app
Explanations of the **technologies** used
A couple paragraphs about the **general approach you took**
Installation instructions** for any dependencies
Link to your **user stories/wireframes** – sketches of major views / interfaces in your application
Link to your **pitch deck/presentation** – documentation of your wireframes, user stories, and proposed architecture
Descriptions of any **unsolved problems** or **major hurdles** you had to overcome


------


## Planning:
The first day of the project, I spent planning it out, with a rough idea of what I wanted the end result to look like, what functions I thought I would need and how I may implement them. I used excalidraw to plan the wireframe of my game


<img src="readme_extras\first-sketch.jpg" >


## Stage 1: The Backend
First I made the user model - This would ask the user for the usual stuff on signing up for the site:
- first and last name
- a picture
- a username to display


`class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=300)
`


## Stage 2: The foreign key.
Now that the user model has been made, I could make the models for everything else - including the foreign key pairs that needed the user model


<img src="readme_extras\Mapping-of-FK's.jpg" >


originally the Mail model was called messages - but Django had internally built functionality called messages already, so I opted for mail - You've got Mail.
Also I thought I would need some sort of inbox model to store them in - this was later removed.


## Stage 3: Testing:
on Postman I tested out if a user could send messages to another user, upload a description about themselves, and store the quiz data. For now, I mostly returned quiz data that didn't mean anything, as I hadn't finalised the questions to ask fully


<img src="readme_extras\quizpostman.jpg" >
<img src="readme_extras\postmanmail.jpg" >


## Stage 4: The start of the front
With the majority of the backend implemented. I began to work on the frontend


The first thing I worked on was the ability to sign in and out, and for the Navbar to change depending if you were logged in or not.
After this was set up, I created a way of sending off the quiz data - I chose to do drop-down boxes, as a multiple choice answer to the questions. It would overall be easier to match people, if there was a limited and unionised form of answering.


<img src="readme_extras\question_one.jpg" >


I didn't want a long list of questions, as that looks intimidating and puts the user off


<img src="readme_extras\question_two.jpg" >

## stage 5:
The user page - This was just a straight forward API call, feeding in the user's ID to get the quiz and description data with that user - As the user is only able to send off one quiz and one description.
`
<DescriptionCard singleUser={singleUser} />
`


## Stage 6:
The messaging. This for me was the hardest part - getting all the messages, filtering for the ones where you are the owner of the message or the receiver:
Then splitting it by person, so I could make a list of users you have messaged - Click on them, and display the messages from you and them to each other.
For a while I had it so if you clicked a user, you would get all of your messages to everyone, and their messages to you.


<img src="readme_extras\api_calls.jpg" >


But I managed to get it working in the end


<img src="readme_extras\messaging_gif.gif" >




## stage 7:
How users are matched.
Using the object keys with a filter method, I was able to match up if two points on different quizzes was the same, adding the amount of correct answers to an array, sorting it from highest to lowest, and returning the first of the array


<img src="readme_extras\match_code.jpg" >


Then making a button on your user page, to match with a user:
This only appears if you own the page, and not if you are seeing another users page


<img src="readme_extras\matching_btn.jpg" >


## Stage 8: How the user pages change.
With the user page returning the quiz data and descriptions working, I wanted the User pages to appear different, if it wasn't your page


<img src="readme_extras\if-not-current-user.jpg" >


From small things like a button to message the user directly


<img src="readme_extras\not_your_page.jpg" >


Or saying that the user hadn't yet done the quiz or the 'About Me' section


<img src="readme_extras\no_data.jpg" >


I did try to implement a gender and preference, but at the eleventh hour, I could not get it to work the way I wanted, so it was removed.
It's 2023, if you get paired with a man, maybe this is life's way of telling you something (;

----

## Wins?:
The messaging functionality was a big win, finally getting that working and diving up to specific users was great.
I learnt a lot on just how to assemble and put together an app. Seeing all the working parts put together, it made a lot of the working theories make more sense.

----

## Bugs?
Apart from all the bug based Entomology puns, there is one other:
Occasionally when you go to your own page after completing both the quiz and description, it was still gives you the ability to enter them again, I believe this is because the user is loaded at the same time the description is checked, as as it needs the user, it comes back as not existing - I think to fix this, I could put more state on the page to refresh.

----

## Challenges?
My naming conventions for certain components weren't the best, I learnt a lot from getting wrapped up in odd naming.
The actual messaging was challenging to get it to work, there were a few problems with it - for a while it displayed all the messages from all of your contacts in everybody's inbox, but I managed to fix that.

----

## Future Improvements:
I'd like to go back and restyle some elements I think need more care. (Also I'd like to have the ability to match based off gender and preferences)
One big feature I'd like to add, would be a Tinder-esque carrousel, where the users are displayed and you can 'Like' them - I do have a carrousel in the About Us page, but I was unable to get it to return a little bit about the user and that click to navigate to them feel
