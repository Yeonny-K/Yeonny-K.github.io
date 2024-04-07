const quotes = [
{
    quote: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett",
},
{
    quote: "Ability is of little account without opportunity.",
    author: "Napoleon Bonaparte",
},
{
    quote: "Victory belongs to the most persevering.",
    author: "Napoleon Bonaparte",
},
{
    quote: "Do not turn back when you are just at the goal.",
    author: "Publilius Syrus",
},
{
    quote: "It is only the ignorant who despise education.",
    author: "Publilius Syrus",
},
{
    quote: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
},
{
    quote: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott",
},
{
    quote: "Every man is the builder of a temple called his body.",
    author: "Henry David Thoreau",
},
{
    quote: "Real success is finding your lifework in the work that you love.",
    author: "David McCullough",
},
{
    quote: "Act as if it were impossible to fail.",
    author: "Dorothea Brande",
},];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;