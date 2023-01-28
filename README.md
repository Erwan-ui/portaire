# Pay me

1. Open the design:  [Figma file](https://www.figma.com/file/BXCF9jeqEzRjuFluIHeHpt/Untitled?node-id=0%3A1&t=3s3NvLEKo543qB95-1)
2. Set up a react app - use CRA or Vite
3. Code the necessary components
4. Populate the component (GET request) with data from this [API endpoint](https://portaireapi.herokuapp.com/test/payment)
5. If by chance the API gives you more than one element in response, choose one at random
6. Modal element on screen two should be launched by clicking the button on screen one, and should auto populate from the API
7. Country should not auto-populate so should be selected manually by the user
8. Card details should not auto-populate so should be entered manually by the user
9. Please validate the card details:
  - basic version: plain check - is it a number with proper number of digits
  - ambitious version: [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)
10. Clicking 'Update' should send (POST request) the form details [Here](https://portaireapi.herokuapp.com/test/payment)
11. Make a pull request to this repo

ENJOY
