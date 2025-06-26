# GDS API: Your Bridge to Wayplan

This GDS API acts as a middle-man, making it easy for your system to talk to the Wayplan API. It simplifies sending and getting data to and from Wayplan.

## How it Works

Our GDS API sends requests to Wayplan, and Wayplan has a special way of working:

* **All Request Data Inside the Token (JWT):** When you ask Wayplan to do something (like create a mission or get information), the actual details of your request (like mission data or what filters to use) are **not** in the normal request body. Instead, these details are packed **inside your JWT (JSON Web Token)**, which is sent in the `Authorization` header. The request body itself is usually empty.

* **Secure Communication:** This JWT also proves who you are to Wayplan.

## Main Features (What You Can Do)

### 1. Create or Change Wayplan Data (`POST /api/v1/mission` - Calls `set-ressource-v2` on Wayplan)

* **What it does:** This is a powerful feature to create new information (like missions, contacts) or update existing ones in Wayplan. You can do many creations/updates at once in a single request.

* **How it works:**

    * You send your mission data (or other resource data) in the `req.body` of your `POST` request.

    * **Important:** Our GDS API then takes *your request data* and puts it **inside the JWT**.

    * This JWT is sent in the `Authorization` header to Wayplan's `Set-ressource-v2` endpoint. The actual HTTP request body is empty.

    * **If your data has a Wayplan ID:** Wayplan will **update** that existing record.

    * **If your data has NO Wayplan ID:** Wayplan will **create** a new record and give it a new ID.

    * **Response:** Wayplan sends back your original data, but now with all the new Wayplan IDs added for anything it created.

### 3. Get Wayplan Data (`GET /api/v1/mission` - Calls `get-resource` on Wayplan)

* **What it does:** Allows you to read information from Wayplan. You can ask for many different types of records in one go.

* **How it works:**

    * You can ask for data by:

        * **Wayplan ID (LIMO ID):** Ask for specific records by their unique Wayplan number.

        * **Your Own Reference (`ref`):** If you gave a record a special `ref` when creating it, you can use that to find it later.

        * **Filtering:** Search for records using conditions (e.g., `fieldName=value`, `fieldName#Min=value`, `fieldName#Max=value`, `fieldName#LIKE=value`).

    * **Important:** Just like with creating data, your request for *what to get* (the IDs or filters) is put **inside your JWT**.

    * This JWT is sent in the `Authorization` header to Wayplan's `get-resource` endpoint. The actual HTTP request body is empty.

    * **Response:** Wayplan sends back the full details of all the records it found matching your request.

## Getting Started

1.  **Set up the API:** Make sure your GDS API is running (e.g., `npm start` or `yarn dev`).

2.  **Add your API_KEY and SECRET_KEY:** to get started (you can also via JWT_TIME_EXPIRATION_ENABLED="false"to enable time expiration for your jwt).

3.  **Make requests:** Use the generated JWT in the `Authorization: Bearer YOUR_TOKEN` header for all other calls to `/api/v1/mission`.
