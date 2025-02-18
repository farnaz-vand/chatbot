Image Upload and Display in Chatbot - Implementation Documentation
Introduction

In this project, the goal was to add the ability to upload and display images in a React and DevExtreme-based chatbot. Previously, the chatbot could only send text messages and used OpenAI Azure for processing the messages.

The goal of this implementation was to:

    Allow users to upload and send images in the chat.
    Display images in the chat without processing them by AI.
    Apply limitations on the image file size and format.

Features Implemented

    Image Upload Capability:
        Users can select and send image files in JPEG, PNG, and GIF formats.
        After selecting an image, a preview of the image is shown in the chat to confirm the user's selection.

    Handling Text and Image Messages:
        Text messages are sent to OpenAI for processing, and a response is received.
        Image messages are displayed in the chat, and no AI response is given. Instead, the message "AI cannot process images" is displayed to the user.

    Data Optimization and Management:
        Images are stored temporarily in the state, and there is no need to upload them to the server. This helps maintain chat speed and performance.
        Text message sending and receiving functionality remain unchanged.

    UI/UX Improvements:
        Images are displayed in the chat appropriately.
        The image size is controlled, and files larger than 5 MB are not accepted.
        An error message is shown if the selected file is not an image or has an invalid format.

    Managing User’s Online Status:
        If the user is offline, a message is shown to inform the user about the lack of internet connection before sending any image or text message.
        The message shown: "You are not connected to the internet. Please check your connection."
        This message disappears when the user connects to the internet, and message sending becomes available again.

Expected Test Scenarios and Results
Scenario 1: Successful Image Upload

    Step 1: The user selects an image (JPEG, PNG, GIF format).
    Step 2: The selected image is displayed correctly in the chat.
    Step 3: The message "AI cannot process images" is shown in response to the uploaded image.

Scenario 2: Sending a Text Message

    Step 1: The user sends a text message.
    Step 2: The message is sent to OpenAI, and a response is received.

Scenario 3: Sending a Non-Image File

    Step 1: The user selects a non-image file (e.g., PDF or text file).
    Step 2: The system displays the error message: "The selected file is not an image," and prevents the file from being sent.

Scenario 4: Sending a Large Image

    Step 1: The user selects an image file larger than 5 MB.
    Step 2: The system displays the error message: "The file size exceeds the allowed limit."

Technologies and Tools Used

    React for building components and managing the state.
    DevExtreme for using the chat widget and displaying messages.
    OpenAI Azure for processing text messages and providing responses.
    JavaScript for managing file selection, showing previews, and handling errors.

Challenges and Solutions

    Challenge with Image Format and Size: Since there was a need to limit the image size, the system had to ensure that selected files were smaller than 5 MB. This was done by checking the file properties.

    Memory Management: Images were temporarily stored in memory and did not need to be sent to the server. This ensured faster and more efficient processing.

Conclusion

This project successfully implemented the ability to upload and display images in the chatbot. Since AI does not process images, only a confirmation message is displayed, and the images are shown in the chat. By applying file format and size restrictions, the user experience was optimized.

Setup Instructions (Yarn)

    Clone the Repository:

git clone https://github.com/your-repository-url.git

Install Dependencies:

Navigate to the project folder and run the following command to install the required dependencies using Yarn:

yarn install

Start the Application:

Once the dependencies are installed, start the application using the command:

yarn start