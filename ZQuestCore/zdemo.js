var quests = [
    {
    name: "The Lost City",
    description: "Find the lost city of Atlantis",
    reward: 1000 gold
  },
  {
    name: "The Evil Wizard",
    description: "Defeat the evil wizard and save the kingdom",
    reward: 5000 gold
  }
];
var questLog = [];
var questTracker = {};

function takeQuest() {
  var quest = quests[Math.floor(Math.random() * quests.length)];
  questLog.push(quest);
  questTracker[quest.name] = 0;
  console.log("You have taken the quest: " + quest.name);
}

function updateQuestTracker() {
  for (var questName in questTracker) {
    var quest = quests.find(function(quest) { return quest.name === questName });
    questTracker[questName]++;
    if (questTracker[questName] == quest.requirements) {
      console.log("You have completed the quest: " + quest.name);
      delete questTracker[questName];
    }
  }
}

function createQuest() {
  var questName = prompt("Enter the name of your quest");
  var questReward = prompt("Enter the reward for your quest");
  var questDescription = prompt("Enter a description for your quest");
  var questRequirements = prompt("Enter the requirements for completing your quest");

  var quest = {
    name: questName,
    description: questDescription,
    reward: questReward,
    requirements: questRequirements
  };

  quests.push(quest);
  console.log("Your quest has been created!");
}

document.querySelector("#take-quest").addEventListener("click", takeQuest);
setInterval(updateQuestTracker, 1000);
document.querySelector("#create-quest").addEventListener("click", createQuest);
