# Orion
Orion is an examination event app which targeted to TOSSAKA and Olimpiade.id, it enables event participant to make a registration, payment, and participate to an offline examination or an online CBT event.

## Application Technical Overview
Orion is responsive, single-page, serverless application. It designed so, so we could maximize development efficiency and iteration without any dev-ops difficulties.
1. Javascript for everything
2. React and Redux for view and state management
3. CRA for build system
4. Firebase Authentication for authentication
5. Firebase Firestore for document database
6. Firebase Realtime-database for statistics and state
7. Google Cloud Function for triggering databases
8. Airbnb's Javascript convention
9. Xendit for payments
10. Material UI
 
## Application Feature Overview
### Feature for User
1. Registration
    1. App Registration
    2. Event Registration
2. Payments
    1. Manual Transfer Payment
    2. Voucher Transfer Payment
    3. Virtual Account Payment (Through Xendit)
    4. Invoice (OPG)
3. Event
    1. Offline Exam Ticket (OPG)
    2. Online Exam Redirect
4. Exam Result

### Feature for Admin
1. Monitoring Statistics
    1. Timeline Statistics
    2. Distribution Statistics
    3. Payments Statistics
    4. Realtime Events Statistics
2. Manage User Registrations
    1. Search User
    2. Edit User
    3. Delete User
3. Manage User Payments
    1. Search Payment
    2. Edit Payment
    3. Delete Payment
    4. Create Vouchers (OPG)
4. Manage User Results
    1. Upload Offline Results
    2. Online Result
5. Event Settings
    1. Payment Closing
    2. Event Branding
    3. Exam Type (Offline or Online)
    4. Landing Page
    
OPG: Orion PDF Generator
    


    

