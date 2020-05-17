# Anne Bailey
## CS 52, Lab 5: Platform API

### Part 1
For the first part of this lab, I created an Express and MongoDB API server for the blog hosted at http://annebailey-placesblog.surge.sh. The server is hosted on Heroku at http://abailey-blog.herokuapp.com/api. 

What worked/what didn't work: I initially had some trouble understanding how the controller interacted with the routes and with the post model, and I ran into some issues as I tried to set up all the API calls at once. I had more success when I created the post model, one GET route, and a simple fetch all API call. I then added the other routes and CRUD functions one by one.

#### Extra credit
I switched tags from being stored as a string to being stored as an array, and split the string by commas and spaces when posts were added or updated on the frontend.

I also added commenting functionality. I store an array of comments for each post in the database, and users can comment on the posts.

### Part 2
For the second part of this lab, I added authorization to the backend and frontend of this blog app.

What worked/what didn't work: I initially had some trouble understanding how all the different parts of this app - passport, user info, error messages, etc. - all fit together. Talking to a few TAs during office hours to sort out how everything fit together helped a lot, and then following that logic as I built up authorization was actually pretty enjoyable.

#### Extra credit
I sadly did not have time for much extra credit this lab. A user can only delete their own posts, but because I did not have time to separate my comments feature from my update posts functionality, users can still update any posts. I have also expanded on my error message handling on the frontend to include authorization errors. 
