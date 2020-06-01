# Calculator Project
* Basic calculator with click and keyboard support 
    * The arrow and backspace keys handle deletion of last character
    * The 'x' button is currently an inactive placeholder
* Shows all numbers and operators on display with max character length of 23
* Handles decimals appropriately
* Will throw silent error when using '=' on single number as split is not a function there. Does not affect use.

##  Refactoring opportunities/needs
* Break compute into smaller reusable functions
* May need to change input method from collecting into a single string to pushing to array to allow improved implementation of functions

## Improvements to be made
* Pretty it up
* Limit decimal length

## Improvements made
* Added hover effect to buttons
* Removed issue with trailing operator
* Added decimal ability with only one allowed in each number
* Added backspace button to correct errors
* Prevent display overflow
* Add keyboard support