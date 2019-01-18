# SDGroup7

Intructions

1) How to Clone the repository:

    git clone https://github.com/jport/SDGroup7.git
    This will create a folder in the active directory called SDGroup7
2) How to pull updates from repository
    git pull origin master
    This will pull any changes made to the repository since your last pull or clone
    If there are any conflicting changes you made, it will ask you to resolve them somehow
3) Pushing your changes
    First run this command:
    git status
    This will give you a report of all the changes you have made
    Always pull before you push (see above)
    If you created a new file you have to add it to the checkout with:
    git add <file name>
    Next, you have to commit your changes as well as give a description of the commit
    git commit -m "Description"
    Finally, you can push your changes with:
    git push origin master
