- Create a Free Tier MongoDB Atlas Database ==> DONE
- Create a collection (blogs). Schema will have : title, content, category:[school, university, general],authorID ==> DONE
- Users collection will have schema : name, password: (keep it static for all), role: [author,customer] ==> DONE
- Create signup & login routes (Create 2 authors and 2 customers) ==> DONE
- Implement all CRUD routes for blogs, add authorization and authentication for update and delete routes ==> DONE
- Author can create blogs. Customer can only view blogs ==> DONE
- Author can update & delete their own blogs but not other author blogs. ==> DONE
- Create search api on title field ==> DONE
- Create filter api on category field ==> DONE

After Nextjs training:

- Create a nextjs app
- Create a page : /blogs
- Fetch and display the blogs as a simple card (No need to focus on styling)
- Add search bar for filter, and Select element for filter and connect the APIs

Additional task (Optional)

- Add an edit blog button on card. It will be hidden for customers.
- Edit button should be visible only for Authors. If I log in as Author-1, the edit button will be visible only on Author-1 blogs.
- On click of edit button, the button text will change to save, On click of save button, the updated blog will be saved in DB.
- The authorID field should not be editable.
