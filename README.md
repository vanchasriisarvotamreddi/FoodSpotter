# 🍴 **Restaurant Finder Application**  
**By Team HPS**  
A CMPE 202 Project from San Jose State University  


## **Welcome to Food Exploration Made Simple!**  
Tired of guessing where to grab your next bite? Our **Restaurant Finder Application** brings dining to your fingertips. Whether you’re craving sushi at sunset, tacos at twilight, or a cozy café for brunch, this app has you covered. Built with precision and passion, it’s more than just a project—it’s your new dining companion!  

### **Meet the Chefs Behind the App**  
- **Hafeeza Samreen**  
- **Pranav Tadepu**  
- **Sahithi Chikkela**  
- **Sarvotam Vancha**  

Together, we are **Team HPS**, blending our expertise to create an intuitive, seamless platform for foodies, business owners, and admins alike.  


## **What’s on the Menu: Feature Set**  

### **For Users:**  
- 🔎 **Search for Restaurants**: Users can search for restaurants by name, cuisine or zip code. This feature leverages GrubHub, enabling users to view real-world restaurant results based on location. Advanced search options allow users to filter results by selecting multiple cuisines and food types for a personalized experience.
- 🕵️ **View Restaurant Information**: Access detailed information about restaurants, including their menu, operating hours, and user reviews.
- ✍️ **Write and Submit Reviews**: Users can share their experiences by writing and submitting reviews for the restaurants they visit.  
- 🔒 **User Authentication**: Secure login and signup functionalities ensure authorized access to the platform.  

### **For Business Owners:**  
- 🏗️ **Manage Restaurant Listings**: Create, update, or delete restaurant listings effortlessly.  
- 📊 **View Reviews and Ratings**: Monitor customer feedback and improve based on real-time reviews.  
- 🕑 **Update Restaurant Details**: Keep restaurant details, such as operating hours and menu, up-to-date.  

### **For Admins:**  
- 👩‍💻 **Manage Users and Listings**: Admins can oversee users, business owners, and all restaurant listings on the platform. 
- 🚮 **Handle Closed or Duplicate Listings**: Review and remove restaurant listings that are either closed or duplicated to maintain data accuracy and integrity.


## **Behind the Curtain: **Tech Stack &** Development**  

### **Frontend**: **React.js**  
Why? Because it's as flexible as pizza dough—perfect for dynamic, interactive interfaces.  

### **Backend**: **Spring Boot**  
Think of it as the chef’s assistant, ensuring all components communicate seamlessly.  

### **Database**: **MongoDB**  
We chose MongoDB for its adaptability, handling evolving data like a pro sous-chef.  

### **Cloud Hosting**: **Amazon AWS**  
AWS keeps our app responsive and available, even during the busiest dinner rush.  


## **The Recipe for Building This App: Pre-requisites**  

### **1️⃣ Prep Time: Local Setup**  
Before diving in, ensure your kitchen (computer) has:  
- **ReactJS**  
- **Java**  
- **Maven**  
- **MongoDB**  

### **2️⃣ Cook Time: Development Decisions**  
We chose the best ingredients:  
- **React.js (Frontend Framework)**: Why React.js: We chose React.js for its ability to build dynamic and interactive user interfaces efficiently. Its component-based structure ensures easy development and reusability, while the virtual DOM improves performance for search and filter operations. React's flexibility is ideal for integrating features like user authentication, review submissions, and restaurant detail displays. 
- **Spring Boot (Backend Framework)**: Why Spring Boot: For the back-end development, we selected Spring Boot due to its simplicity and seamless integration capabilities. It facilitates smooth communication between different parts of our website, ensuring a cohesive user experience. 
- **AWS (Cloud Provider)**: Why AWS: When it came to hosting our website, we turned to AWS for its robust cloud infrastructure and comprehensive suite of services. AWS ensures our website remains accessible and responsive, even during periods of high traffic.
- **MongoDB- NoSQL (Database)**: Why MongoDB: We chose MongoDB for its flexibility and developer-friendly nature, which makes it ideal for applications requiring dynamic and evolving data models. Unlike other NoSQL databases, MongoDB supports multiple levels of nested data without predefined structures, offering unparalleled versatility. Its schema-less design eliminates the need for upfront schema definitions, allowing for dynamic changes during development. Additionally, MongoDB provides secondary indexes, enabling efficient querying and making it more adaptable compared to alternatives like Cassandra.
- **MongoDB Hosting**: The database is hosted on MongoDB Atlas, deployed in the us-west (Ohio) region. We use a three-node replica set with one primary and two secondary members, providing high availability and failover capabilities. The setup leverages MongoDB's managed services for simplicity, as the application does not require the scale of a full production environment.
- **Application Load Balancer (Deployment)**: The backend is deployed on an AWS EC2 instance behind an Application Load Balancer (ALB) to ensure high availability and fault tolerance. The ALB distributes traffic across multiple targets and is configured with subnets in two different availability zones for redundancy. Health checks are implemented, requiring three consecutive successful checks to mark an instance as healthy.

## **3️⃣ Core Values: Our Secret Sauce**  

- **Communication**:  The team ensured effective communication through daily stand-ups, real-time collaboration via tools like Slack and GitHub, and pair programming. This open exchange of ideas helped clarify requirements, resolve issues quickly, and maintain alignment across all team members.
- **Simplicity**:  The team followed the "You Aren’t Gonna Need It" (YAGNI) principle, focusing only on essential features and avoiding over-engineering. By delivering simple, efficient solutions, the project remained adaptable, with a clean and manageable codebase.

## **4️⃣ Scrum Meeting Schedule: Slack**

**Monday, Wednesday, Friday**


## **5️⃣ Visual Feast: UI wireframes, UML Diagrams**  

### **Architecture Diagram**
![Archd](https://github.com/user-attachments/assets/188f3f02-5c24-48c9-9700-b6dd0141f452)

### **UML Component Diagram**
![dep](https://github.com/user-attachments/assets/aa41563d-c3df-4283-9815-2f75a6bf0fc4)

### **UML Deployment Diagram**
![compd](https://github.com/user-attachments/assets/1570dc0c-7921-46fb-b0c5-734706865837)

### **UI Wireframes**
- **Landing Page**
  
![LandingPage](https://github.com/user-attachments/assets/acea7bf1-b430-4ed9-abd4-9a5487354192)

- **Register page**
  
![Register](https://github.com/user-attachments/assets/f1bbd1e4-c82b-4376-b63a-f0b6ffff4ff4)

- **Login page**

![Login](https://github.com/user-attachments/assets/c36072d1-8160-4d0a-ad52-c32487a36309)

- **Admin Dashboard**
  
![AdminDashboard](https://github.com/user-attachments/assets/b47f8257-7dce-4627-b341-83a2e59742cd)

- **Owner Landing Page**
  
![OwnerLanding](https://github.com/user-attachments/assets/3ef40499-21ba-4107-bc81-a916eacc3de7)
 
- **Add Restaurant Page**
  
![AddRestaurant](https://github.com/user-attachments/assets/7fe19214-41f7-4bf8-904f-ebaab01f51ab)

- **Business Owner Dashboard**
  
![BusinessDashboard](https://github.com/user-attachments/assets/9d0d24f7-0ea0-4e9e-9dfd-6b012a2db06d)

- **Restaurant Information Page**
  
![RestInfo](https://github.com/user-attachments/assets/dd799a58-8d75-4173-a50e-c2797b6526a4)

- **Restaurant Review Page**
  
![RestReviw](https://github.com/user-attachments/assets/bfbdca5f-ffd0-4a6f-b3bf-1d1605254ceb)



## **6️⃣ Deliverables & Scrum Journal**  

- **Sprint Chart:** [View Here](https://docs.google.com/spreadsheets/d/1qZhnwLHAVBL3d5rit9HilcQP9-CIPZvZ35_m1BrdOXU/edit?usp=sharing)  
- **Weekly Scrum Reports:** [View Here](https://docs.google.com/document/d/1K4yxUe_vYuS_pS3Yc3Lfd-oPb5uJnIQVEF2H2IrsWG4/edit?usp=sharing)  

## **7️⃣ Scrum Feast: How We Plated This Project**  

### **Sprint 1: Appetizers (16 Sep - 29 Sep)**  
Set up Private GitHub Repository with Git Classroom Invite for Team 
Create UML Diagrams for Project Setup 
Create UI Wireframes Using Figma 
Design responsive UI/UX 
Reactjs Framework Setup with TypeScript 
Design Wireframes for Restaurant Management 
Design Wireframes for User, Business Owner, and Admin 
Spring Boot Setup with Java 
Configure Mongo Database Setup
![sp1](https://github.com/user-attachments/assets/73528d3a-b046-4328-b6ba-edcbec241f35)

### **Sprint 2: First Course (30 Sep - 13 Oct)**  
Implement Role-Based Access Controls for Owner, User and Admins 
Develop Features for Admins to Manage Listings 
Implement User Authentication System 
Design and Implement search functionality for user 
Develop API endpoints to Create, Retrieve Restaurant details 
Develop Feature for Owner to Add/ Update listings 
Integrate Maps for Location Search API Input Validation and Error Management
![sp2](https://github.com/user-attachments/assets/a919729b-01f1-4fb4-acbb-1db69f325b89)

### **Sprint 3: Entrée (14 Oct - 27 Oct)**  
Develop API endpoints to Add Restaurant 
Develop API endpoints to List Restaurants 
Develop API endpoints to User Authentication 
Develop API endpoints for Google Maps Integration 
Develop API endpoints for Admin to Remove Duplicate Listings 
Develop Features for BusinessOwners to Add and Manage Listings 
Develop Features for Users to View Reviews Set up Mock Database Schema for Users
Develop Feature for User to Submit Reviews
![sp3](https://github.com/user-attachments/assets/5ae00b5b-3826-45f0-bc3b-72b8521d379f)

### **Sprint 4: Sides (28 Oct - 10 Nov)**  
API Input Validation and Error Management 
Develop Features for BusinessOwners to Add and Manage Menus 
Develop Feature for Admins to Monitor Restaurant Listings 
Develop API Endpoints to retrieve data from maps 
Develop API endpoints for Admin to fetch duplicates 
Develop Features for Users to View Reviews and submit reviews 
Develop Feature for users to search by name and different categories 
Develop API endpoints for Restaurant Management 
![sp4](https://github.com/user-attachments/assets/62db6d90-9f00-4d5b-8874-bdcfa4090e42)

### **Sprint 5: Dessert (11 Nov - 24 Nov)**  
Add robust validations and error handling to the Add/Edit Restaurant forms. 
Enable users to view detailed restaurant information, dynamic reviews and aggregated ratings. 
Add input validation and error handling for login and registration forms. 
Add Validation for search inputs in the home screen and remove listings for closed businesses.
![sp5](https://github.com/user-attachments/assets/98e1d5b8-401b-4bfe-98e6-164ac6cfb8ee)

### **Sprint 6: The Final Touch (25 Nov - 8 Dec)**  
Prepare project documentation 
Handle the deployment 
Conduct end-to-end testing of workflows 
Conduct UI/UX testing across all roles
![sp6](https://github.com/user-attachments/assets/80b63fc4-96b4-434f-aecb-11c82fa180eb)


## **Get Started & Bon Appétit!**  
Ready to explore your next favorite restaurant or manage your dining business? Clone the repo, set it up, and start serving smiles!  

📧 Questions? Feedback? Contact Team HPS for more info!  

Happy Dining!  
