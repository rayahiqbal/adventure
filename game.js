const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

const GameState = {
  PURPLE_CRYSTAL: 'purpleCrystal',
  SWORD: 'sword',
  SHIELD: 'shield',
};

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((node) => node.id === textNodeIndex);
  textElement.innerText = textNode.text;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = createOptionButton(option);
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = { ...state, ...option.setState };
  showTextNode(nextTextNodeId);
}

function createOptionButton(option) {
  const button = document.createElement('button');
  button.innerText = option.text;
  button.classList.add('btn');
  button.addEventListener('click', () => selectOption(option));
  return button;
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see glowing purple crystal near you.',
    options: [
      {
        text: 'Take the crystal',
        setState: { purpleCrystal: true },
        nextText: 2,
      },
      {
        text: 'Leave the crystal',
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the crystal for a sword',
        requiredState: (currentState) => currentState.purpleCrystal,
        setState: { purpleCrystal: false, sword: true },
        nextText: 3,
      },
      {
        text: 'Trade the crystal for a shield',
        requiredState: (currentState) => currentState.purpleCrystal,
        setState: { purpleCrystal: false, shield: true },
        nextText: 3,
      },
      {
        text: 'Ignore the merchant',
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: 'After leaving the merchant, you start to feel tired and stumble upon a small town next to a dangerous-looking castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4,
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5,
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by a terrible monster.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: 'Without any money to buy a room, you break into the nearest inn and fall asleep. After a few hours of sleep, the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: 'You wake up well-rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: 'While exploring the castle, you come across a terrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8,
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: 'Throw the crystal at it',
        requiredState: (currentState) => currentState.purpleCrystal,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches you.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: 'You threw your crystal at the monster and it exploded in a burst or glitter. After it settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your own and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1,
      },
    ],
  },
];

startGame();
