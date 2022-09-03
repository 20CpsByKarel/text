const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Probudil jsi se na neznámém místě, vedle sebe vidíš sklenici neznámého charakteru a uvnitř je něco, co vypadá jako modrý sliz.',
    options: [
      {
        text: 'Vzít sklenici.',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Nechat zde sklenici',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Vydal jsi se hledat odpověď, kde to jsi a co tu děláš, ale najednou jsi narazil na obchodníka.',
    options: [
      {
        text: 'Vyměnit sklenici se slizem za meč.',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Vyměnit sklenici se slizem za štít.',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignorovat obchodníka.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Po odchodu od obchodníka jsi se začal citít unavený a narazil jsi na malé městečko vedle hradu, co vypadá nebezpečně.',
    options: [
      {
        text: 'Prozkoumat hrad.',
        nextText: 4
      },
      {
        text: 'Najít si pokoj ve městě a přespat.',
        nextText: 5
      },
      {
        text: 'Najít nějákou kopku sena a přespat na ní.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Byl jsi až moc unavený, a tak jsi během prozkoumávání hradu usl. V noci tě zabilo monstrum obývající tento hrad.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Bez peněz na pokoj jsi se vloupal do nejbližšího hostince a usnul jsi. Po několika hodinách spánku tě našel majitel hostince a nechal tě městskou stráží zavřít do cely.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Probudil jsi se plný energie a připravený prozkoumat hrad.',
    options: [
      {
        text: 'Prozkoumat hrad.',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Při prozkoumávání hradu jsi narazil na hroznou příšeru stojící ti v cestě..',
    options: [
      {
        text: 'Zkusit utéct',
        nextText: 8
      },
      {
        text: 'Zaútočit tvým mečem.',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Schovat se za tvůj štít.',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Hodit po ní sklenici s modrým slizem.',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Tvoje pokusy o útěk byly marné, monstrum je velmi ryhlé, a tak tě velmi rychle chytilo a našlo.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Naivně jsi si myslel, že toto monstrum lze zabít jediným mečem a umřel jsi..',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Monstrum se zasmálo, že jsi se schoval za štít jako srab a snědlo tě..',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Hodil jsi sklenici se slizem po monstru a sklenice explodovala. Když se prach z výbuchu usadil, vyděl jsi, že monstrum je mrtvé. Potom, co jsi viděl, že je monstrum mrtvé a nahradě není žádné další, rozhodl jsi se zde ubytovat a prohlásit hrad za svůj.',
    options: [
      {
        text: 'Gratulace. Kliknutím hrej znovu.',
        nextText: -1
      }
    ]
  }
]

startGame()