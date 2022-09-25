# FITME

FITME is a social media platform for anyone interested to document their fitness journey. Users can upload images on their account to keep themselves accountable and monitor their progress over time. Additionally FITME users are able to give kudos(show support) to other user's images and follow each other.

Link to deployed site: [FITME](https://react-fitme.herokuapp.com/)

FITME is a full stack project, the Frontend is built using [React](https://reactnative.dev/) and the backend database and the API is built using [Django Rest Framework](https://www.django-rest-framework.org/)

Link to [deployed API](https://drf-fitme.herokuapp.com/)
Link to code on github for the [github rapitory for API](https://github.com/lauraz-15/drf-fitme)


## Table of Contents

+ [UX](#ux "UX")
  + [Project Goals](#project-goals "Project Goals")
  + [Future Site Goals](#future-site-goals "Future site goals")
  + [Target Audience](#target-audience "Target Audience")
  + [Current User Goals](#current-user-goals "Current User Goals")
  + [New User Goals](#new-user-goals "New User Goals")
+ [User Stories](#user-stories "User Stories")
  + [User stories](#user-stories "User stories")
  + [Admin stories](#admin-stories "Admin stories")
  + [Visitor stories](#visitor-stories "Visitor stories")
+ [Design](#design "Design")
  + [Wireframes](#wireframes "Wireframes")
  + [Typography](#typography "Typography")
  + [Colour Scheme](#colour-scheme "Colour Scheme")
  + [Logo](#logo "logo")
+ [Features](#features "Features")
  + [Existing Features](#existing-features "Existing Features")
  + [Future Features](#future-features "Future Features")
+ [CRUD](#crud "CRUD - Create Read Update Delete")
+ [Components](#oomponents "Components")
+ [Testing](#testing "Testing")
  + [Accessability](#accessability "Accessability")
  + [Validator Testing](#validator-testing "Validator Testing")
  + [Manual Testing](#manual-testing "Manual Testing")
  + [Unfixed Bugs](#unfixed-bugs "Unfixed Bugs")
+ [Technologies](#technologies "Technologies")
  + [Languages Used](#languages-used "Languages Used")
  + [FrontEnd Libraries](#frontEnd-ibraries "FrontEnd Libraries")
  + [Other Technologies](#other-technologues "Other Technologies")
+ [Deployment](#deployment "Deployment")
  + [Version Control](#version-control "Version Control")
  + [API Connection](#api-connection "API Connection")
+ [Credits](#credits "Credits")


# UX

## Project Goals

1. motivate users to get fit and keep users motivated
2. keep users accountable when they are on their fitness journeys with having ability to uplaod and edit images
3. keep users engaged of the content and make them interested to keep comming back
4. provide users a space where they can see their fitness related photos all in one place and keep their stat in one page
5. provide and opportynity for users to engage with other users
6. get users to see their favorited images in one feed so they get to review them when they want to
7. create an applictions where users can sign up and log on
8. Create an interface that has user friendly interface and pleasant to use so that users are interested to stay on the application longer

## Future Site goals

1. Connect the app with third party applications to easily import data such as daily step count, calorie count, sports activities and others. 
2. Create a space for users to interact on a specific topic, such as group a about running or walking groups
3. Add functionality to be able to share the content from FITME on other social media platforms to encourage other users to join FITME

## Target Audience

The target users are adults of any age.

## Current User Goals

- engage users to use site to see the latest content of other users
- encourage users to publish their own content and get more kudos

## New User Goals

- Sign up functionality presented to the user encouraging them to join
- Provide latest contetn on the landing page to invite users to scroll down

# User Stories

The project was built based on users stories. 
User stories are orgnised in 6x Epics and 3 milestones.
The three milestones(sprints) are named Main, Build Up and Extra, which stand for three time frames starting with the Main, most necessary features that needs to be built first. For examle the deadline to finish all user stories into the Main Sprints was on 13th of September.

Please see the summary of the kanban board [here](https://github.com/users/lauraz-15/projects/2/views/1)

## User stories

### EPIC: Navigation & Authentication

#### USER STORY: Nav Bar
- As a user I can see the nav bar on all pages, so that I can easily navigate around the site and change pages

Project Goal: #8

#### USER STORY: Routing
- As a user I can navigate through pages quickly, so that can view content seamlessly without pages refreshing each time

Project Goal: #8

#### USER STORY: Navigation: Conditional rendering
- As a logged out user I can see sign in and sign up buttons, so that sign in/sign up

Project Goal: #8

#### USER STORY: Authentication - Refreshing access tokens
- As a user I can maintain my logged-in status, so that I don't have to log on too often

Project Goal: #8

#### USER STORY: Authentication - Logged in Status
- As a user I can easily know if I am signed in or not, so that I can log on or off if I need to

Project Goal: #8

### EPIC: Image

#### USER STORY: Add Image
- As a a logged in user I can capability, so that I can upload images on my account

Project Goal: #2

#### USER STORY: Image Detail
- As a a user I can view image details, so that I can see the image in larger size

Project Goal: #1

#### USER STORY: Edit function for images
- As a logged in user I can edit my images posts, so that I am in control of the content I publish

Project Goal: #2

#### USER STORY: Delete function for images
- As a logged in user I can delete my images posts, so that I am in control of the content I publish

Project Goal: #2

### EPIC: Kudos

#### USER STORY: Add kudos to other user's images
- As a logged in user I can add kudos to other user's images so that express my support to other users

Project Goal: #1

#### USER STORY: User kudos feed 
- As a logged in user I can view the images I have given kudos to, so that so that I can easily find them again

Project Goal: #6

### EPIC: Comments

#### USER STORY: Add comments
- As a logged in user I can add comments to an image, so that interact with other users

Project Goal: #5

#### USER STORY: View user comments
- As a user I can view my own and other user's comments, so that I can interact with others

Project Goal: #5

#### USER STORY: Delete comments
- As a logged in user I can delete my comments, so that I am in control of the content I publish

Project Goal: #5

#### USER STORY: Edit comments
- As a logged in user I can edit my comments, so that I am in control of the content I publish

Project Goal: #5

### EPIC: Main Images Feed

#### USER STORY: Recent images feed
- As a a user I can view most recent images on the main feed, so that I see fresh content first

Project Goal: #3

#### USER STORY: Search feature 
- As a user I can search using keywords, so that I can find images and user accounts I want to view

Project Goal: #8

#### USER STORY: Infinite scroll - load images 
- As a user I can scroll down the page infinitely, so that I can see new content loading without the need of changing the page

Project Goal: #3

### EPIC: Account

#### USER STORY: Authentication - Sign up
- As a user I can sign up and create a new profile, so that I am able to use all features of the website

Project Goal: #7

#### USER STORY: Authentication - Sign in
- As a site user I can log on to my account, so that I can use the functionality for signed in users

Project Goal: #7

#### USER STORY: Account details
- As a user I can view other user's account photo and name, so that I can easily check users account page

Project Goal: #5

#### USER STORY: Account Page
- As a user I can other user's profile pages, so that I can learn more about them

Project Goal: #5

#### USER STORY: Following function
- As a logged in user I can follow other users, so that I can see their latest photos posted on my home page

Project Goal: #5

#### USER STORY: Unfollow function
- As a logged in user I can unfollow other users, so that I don't their posted content on my homepage

Project Goal: #5

#### USER STORY: Edit account details
- As a registered user I can edit my own profile, so that I can share more details about me to other users

Project Goal: #4

#### USER STORY: My Account page
- As a logged in user I can view my own account page, so that I can see all my uploaded photos and account stats in one place

Project Goal: #4

# Components

One of the great benefits of using React is that application acn be built using reusable components. 
FITME Applucation has numerous reusable Components, as for example:

- Edit.js Dropdown option to provide a selection of options that are otherwise hidden until the button clicked
This component is reused for emages and comments and also for edit account dropdown.
- Profile.js Profile image organised and styled so this component can be used widely on the application, for xample Comment section to show who has written the comment or the navbar to show the loggen in user etc.
- PageNotFound.js This component will be presented to any invalid link that user tried to enter
- NavBar.js  Component is reused on each page of the application
- Imge.js Component sets the basic structure and style of each image, which then is used in other Image related Components

# Testing

### Accessability

Lighouse on Google Developer tools was used to test the accessability on all pages. Some style changes were added in order to pass the test on 100%.
Additionally some alt tags and aria labels were added. All pages passes accessability guidlines 100%

![Accessability](src/assets/readme/accessability.png)

# Technologies

### Languages Used

- HTML5
- CSS3
- Javascript
- JSX
- Python (The backend)
- Django Rest Framework (The backend)
- SQL- Postgres (The backend)

### FrontEnd Libraries

- [React](https://reactjs.org/) Used as the main Frontend lbrary to build the application
- [ReactBootstrap](https://react-bootstrap.github.io/) Used to add structure and style to Components, such as the nav bar, forms etc.
- [Axios](https://axios-http.com/docs/intro) Used for API requests
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) used to set up access tokens
- [React Infite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component) used to implement infinite 
scroll option for image feed pages
- [React Router Dom](https://v5.reactrouter.com/web/guides/quick-start) used for url links and pages


### Other Technologies

- [Canva](https://www.canva.com/en_gb/) Used fro logo design
- [Google Fonts](https://fonts.google.com/) Used to import the fonts for the page
- [Colorhunt.co](https://colorhunt.co/palette/93b5c6c9ccd5e4d8dcffe3e3) Used to generate a color pallette
- [Favicon.io](https://favicon.io/) Used to create a favicon
- [Github](https://github.com/) Used to build and deploy the site
- [Git](https://git-scm.com/) Used for version control to commit and push code on github raspitory
- [Google Developer Tools](https://developer.chrome.com/docs/devtools/) was used to test responsivness and debug the code
- [Font Awesome](https://fontawesome.com/) Used to add icons
- [Balsamiq](https://balsamiq.com/) Used to create wireframes


# Deployment

The repository is built on github, but deployment managed on Heroku. 
To deply the application I have done the following steps:

#### Github
1. Log on to the github and press create a new repository
2. Click on gitpod and open the workspace
3. Install React with the following command:

npx create-react-app . --template git+https://github.com/Code-Institute-Org/cra-template-moments.git --use-npm

4. Make sure all files have been pushed to github useing the commands git add, git commit -m  and git push(explaind in the Version control section)

#### Heroku
5. Log on to Heroku and create a new app and add the name
6. Click on Deploy tab and select Github from the selection
7. Serch for the repository just created on github and click "Connect"
8. Then scroll down the page and click on "Deploy Branch"
9. Once the build is finished click on the button "Open App" to launch the live site

### Version Control

The site was built using terminal commands to "commit" and "push" changes on to github:
- git add . (To prepare files to add)
- git commit -m "Some description of the commit" (To decscribe partiular commit/changes made)
- git push (push the changes on to github)

### API Connection

In order to connect the frontend application to the api backend I have followed the steps below:
1. Logged on to Heroku and find the backend application (drf-fitme)
2. Go to settings tab and Config Vars
3. Enter the key value pairs as follows:

Deployed link for the front end application:
CLIENT_ORIGIN(key) - https://react-fitme.herokuapp.com (value)

Development link on gitpod interface:
CLIENT_ORIGIN_DEV(key) - https://8000-lauraz15-reactfitme-ylzvbqtzz78.ws-eu64.gitpod.io (value)

4. Make sure the trailling slash at the end has been removed at the end of the link and click save
5. Add Axios defaults file on the Frontend application, and install axios.[See the file here](https://github.com/lauraz-15/react-fitme/blob/main/src/api/axiosDefaults.js)

# Credits

Moment Walkthrough project was the inspiration for this application.


