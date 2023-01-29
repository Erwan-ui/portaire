### ImplementationDetails

This is my implementation of the Portaire technical challenge. As the purpose of the challenge was to measure my technical abilities, I have implemented everything that was required manually (without importing a library). This naturally lead to a code that is not as tidy and clean as I would have hoped, and I would love to discuss potential improvements that could be made.

I have taken some liberties along the way according to my experience and to what I think are best practices, here is a list of them:

- I have decided to use Redux in order to manage the state of the app, especially the user data. I did this to mimick most realistically what usually happens in the industry. Indeed, it makes sense to persist the user's data and to make it accessible globally within the app. I also think it simplifies communication between child and parent components. A potential improvement here could be to store the user's information in the local storage.

- I have added manual validations to all fields of the form. This may be some kind of OCD but I couldn't deliver a form that has only one field validation, therefore I added them everywhere. It's important to note that I did everything manually here to show React/JS/CSS skills, but I would opt for a library that handles forms and validations in a real life scenario. Nevertheless it was pretty fun to implement that way.

You will find below the validation rules I applied:

| Field       | Rule                                                    |
| ----------- | ------------------------------------------------------- |
| Card Number | Length check + Luhn algorithm check (both need to pass) |
| Address one | Check if field empty                                    |
| Address two | Check if field empty                                    |
| Country     | Check if no country selected                            |
| State       | Check if field empty                                    |
| Post Code   | Check if field empty                                    |

- I have applied masks manually to the credit card input, which was challenging and fun.

### Improvement ideas

Here are some things I would like to improve if I had more time to complete this.

- Improve test coverage.
  As you can see, I added a few tests but most of them aren't passing. This is for several reasons. First of all, I was short on time and decided to focus on the instructions that were given. Second, since I haven't worked with React in a while, I have never gotten the occasion to use the JEST library, which I could learn pretty fast if I had a little more time. Therefore I create simple rendering tests and added the logic I would apply, it's just the setups of the tests that I am not familiar with and that I would improve in order to make them work.

- Separate/create more components. I created a few custom components, but if I had more time I would like to compartmentalize even more (creating a CustomInput file for the inputs that are a lot alike, create a component for the Buttons and update the style based on props).

- Use libraries to tidy up the code and avoid doing masks, calculations by myself.

- I would also encourage the usage of translation files so that we have no text in our templates/component, but only references to the copy. This would enable us a lot of flexibility when scaling and thinking of reaching new countries/markets. I also prevents many errors, forgotten removals and testing.

### Feedback

Thank you very much for this technical challenge, I really enjoyed being given some time to plan and think the implementation. I also like the fact that although the challenge seems pretty easy, there are always more layers of complexity/ sophistication that can be sought and found.

### Instructions

In order to run the app you can clone the repo, run `npm install` and `npm start` in the console.

In order to run the tests you can run `npm test` in the console.
