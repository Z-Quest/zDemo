function choosePath(path) {
    const output = document.getElementById('output');

    switch (path) {
        case 'privateer':
            output.innerHTML = "Ahoy, Privateer! Set yer course for the Port Askance Crew Boards.";
            break;
        case 'pirate':
            output.innerHTML = "Ye daring Pirate, the Port Askance Tavern beckons!";
            break;
        case 'navy':
            output.innerHTML = "As for ye steadfast Navy sailor, stand by the Harbor Master's side.";
            break;
        default:
            output.innerHTML = "Avast! Ye be lost at sea!";
    }
}
