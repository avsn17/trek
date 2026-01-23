const responses = ["Keep going.", "You are doing great.", "Every step forward matters.", "Slow or fast, it still counts.", "Breathe deep.", "Feel your body working.", "Feel yourself getting stronger.", "The trail is your friend.", "The climb is making you better.", "You are capable of more than you think.", "You are steady.", "You are resilient.", "It is okay to feel tired.", "It is not okay to give up on yourself.", "One step at a time.", "One breath at a time.", "You chose this.", "You are strong enough for this.", "Keep moving.", "You've got this."]

function getHappyResponse() {
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
}