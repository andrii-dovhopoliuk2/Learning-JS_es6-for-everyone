import { createElement } from '../helpers/domHelper';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
    const title = 'Winner name';
    const { name, health, source : image } = fighter;

    const fighterDetails = createElement({ tagName: 'div', className: 'modal-body' });
    const detailsDiv = createElement({ tagName: 'div' });
    const nameElement = createElement({ tagName: 'span', className: 'fighter-name' });
    nameElement.innerText = name + ' (' + health +')\n---';
    detailsDiv.append(nameElement);
    const imageDiv = createElement({ tagName: 'div' });
    const imageElement = createElement({ tagName: 'img', className: 'fighter-image' });
    imageElement.src = image;
    imageDiv.append(imageElement);
    fighterDetails.append(detailsDiv);
    fighterDetails.append(imageDiv);

    const bodyElement = fighterDetails;
    showModal({ title, bodyElement });
    ///
    fighter.then(fighter => {
        const bodyElement = winnerFighterDetails(fighter);
        showModal({title, bodyElement});
    });
}

function winnerFighterDetails(fighter) {
    const { source, name} = fighter;

    let attributes = { align: "center" };
    const fighterDetails = createElement({ tagName: 'div', className: 'modal-winner', attributes});
    const nameElement = createElement({ tagName: 'h3', className: 'fighter-name' });
    attributes = { src: source};
    const imageElement = createElement({tagName: 'img', className:'fighter-image', attributes});

    // show fighter name, attack, defense, health, image

    nameElement.innerText = 'Name - ' + name;

    fighterDetails.append(nameElement, imageElement);

    return fighterDetails;
}