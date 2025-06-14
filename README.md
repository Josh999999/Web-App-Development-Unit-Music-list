# Web-App-Development-Unit-Music-list
This is a website that I made for my web application programming unit at university - this site lets uses to create a list of their favourate songs for storage and reference. Users can manage the store: Add new songs from artists and update their information. Songs can also be deleted from the list.

---

### Content of the repository:
  - **JSON** - This simulates the database for the site and stores all the songes and artists present in the users list.
  - **JavaScript Scripts** - JavaScript scripts contains the interactivity for the site (mainly for controlling the layout of the page)
  - **HTML** - This proivdes the layout of the main page
  - **Python (Flask)** - This proived the backend logic for the operations that interact with the database (JSON)
  - **CSS Styling** - Styling for the HTML pages

---

## Running the site
To run the site in it's current state you will need to follow the current steps

<br>

### Step 1. Download Fask
Download the current python version of flask using pip from the command line
```
python3 -m pip install Flask
```
<br>


### Step 2. Create a virtual environment
Use venv to create a virual environment (container) to run the Flask application server
```
python3 -m venv myenv
```
<br>


### Step 3. Activate the virtual environment
Activate the viirutal environment as an environment to run the Flask application server
```
myenv\Scripts\activate
```
<br>


### Step 4. Run the Flask API
Run the Flask API and application to server that will be used to serve the web pages
<br>
Right click inside the home.php file and click "PHP Server: Serve Project"
```
flask --app app run
```
<br>


