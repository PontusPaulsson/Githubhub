
//Decides what color language should be.
function returnLanguageColor(language) {
    switch (language) {
        case "JavaScript":
            return '#f1e05a';

        case "Java":
            return '#b07219';

        case "HTML":
            return '#e34c26';

        case "Python":
            return '#3572A5';

        case "PHP":
            return '#4F5D95';

        case "C#":
            return '#178600';

        case "Ruby":
            return '#701516';

        case "CSS":
            return '#563d7c';

        case "C++":
            return '#f34b7d';

        case "C":
            return '#555555';

        default:
            return "black";
    }
}