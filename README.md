## Love Bug!

## Description

This project was assigned at the end of the eleventh week of General Assembly’s 3-month SEI (Software Engineering Immersive) course, in which I am studying the fundamentals of software engineering with the aim to launch a career in this sector. The aim of the project was to show our ability at making an independent full stack app.

-----

## Deployment link:
https://codebyjetmsg.netlify.app/

## Technologies Used: 
To complete this project I used:
 - Python | Django for the back-end
 - JavaScript and React for the front.
 - using MUI for styling

### Brief: 
With this project, we were given the brief to build a full stack app in a week, working solo. The functionality of the app was up to us, but it had to demonstrate at least 2 relationship key pairings - With that in mind, and as a play on relationships as a whole, I chose to make a mock dating website - Where users could register, get paired with other users, and message freely between themselves.

------

## Planning:
The first day of the project, I spent planning it out, with a rough idea of what I wanted the end result to look like, what functions I thought I would need and how I may implement them. I used excalidraw to plan the wireframe of my game

<img src="readme_extras\first-sketch.jpg" >

## Stage 1: The Backend
First I made the user model - This would ask the user for the usual stuff on signing up for the site:
- first and lase name
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

originally the Mail model was called messages - but Django had internally built functionality called messages already, so I opt'd for mail - You've got Mail.
Also I thought I would need some sort of inbox model to store them in - this was later removed.

## Stage 3: Testing:
on Postman I tested out if a user could send messages to another user, upload a description about them selves, and store the quiz data. For now, I mostly returned quiz data that didn't mean anything, as I hadn't finalized the questions to ask fully


<img src="readme_extras\quizpostman.jpg" >
<img src="readme_extras\postmanmail.jpg" >

## Stage 4: The start of the front
With the majority of the backend implemented. I began to work on the frontend

The first thing I worked on, was the ability to sign in and out, and for the Navbar to change depending if you were logged in or not.
After this was set up, I created a way of sending off the quiz data - I chose to do drop-down boxes, as a multiple choice answer to the questions. It would overall be easier to match people, if there was a limited and unionized form of answering.

<img src="readme_extras\question_one.jpg" >

I didn't want a long list of questions, as that looks intimidating and puts the user off

<img src="readme_extras\question_two.jpg" >

With the questions set and the API calls working...

## stage 5:
The description was much of the same. Except easier, as I didn't have to think of cliche questions to ask (;

## stage 6:
The user page - Now I have data to display, I need somewhere to display it. This was just a straight forward API call, feeding in the user's ID to get the quiz and description data with that user - As the user is only able to send off one quiz and description.
`
<DescriptionCard singleUser={singleUser} />
`

## Stage 7:
The messaging. This for me was the hardest part - getting all the messages, filtering for the ones where you are the owner of the message or the reciever:
Then splitting it by person, so I could make a list of users you have messaged - Click on them, and display the messages from you and them to each other.
For a while I had it so if you clicked a user, you would get all of your messages to everyone, and their messages to you.

<img src="readme_extras\api_calls.jpg" >

But I managed to get it working in the end 

<img src="readme_extras\messaging_gif.gif" >


## stage 8:
How users are matched.
Using the object keys with a filter method, I was able to match up if two points on different quizes was the same, adding the amount of correct answers to an array, sorting it from highest to lowest, and returning the first of the array

<img src="readme_extras\match_code.jpg" >

Then making a button on your user page, to match with a user:
This only appears if you own the page, and not if you are seeing another users page

<img src="readme_extras\matching_btn.jpg" >

## Stage 9: How the user pages changes. 
With the user page returning the quiz data and descriptions working, I wanted the User pages to appear different, if it wasn't your page

<img src="readme_extras\if-not-current-user.jpg" >

From small things like a button to message the user directly

<img src="readme_extras\not_your_page.jpg" >

Or saying that the user hadn't yet done the quiz or the 'About Me' section

<img src="readme_extras\no_data.jpg" >

I did try to implement a gender and preference, but at the eleventh hour, I could not get it to work the way I wanted, so it was removed.
It's 2023, if you get paired with a man, maybe this is lifes way of telling you something (;


## Future Improvements: 
I'd like to go back and restyle some elements I think need more care. (Also I'd like to have the ability to match based off gender and preferences)
One big feature I'd like to add, would be a Tinder-esque carrousel, where the users are displayed and you can 'Like' them - I do have a carrousel in the About Us page, but I was unable to get it to return a little bit about the user and that click to navigate to them feel