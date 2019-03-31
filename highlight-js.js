const string = 'You will deliver new technology with an adorable puppy. Perfect!'; //string to highlight
const highlights = [ //highlight objects in order of priority
    {
        startOffset: 4,
        endOffset: 20,
        color: '#d9f593',
        priority: 0,
    },
    {
        startOffset: 17,
        endOffset: 31,
        color: '#e8e8e8',
        priority: 1,
    },
    {
        startOffset: 37,
        endOffset: 55,
        color: '#bfe6fc',
        priority: 3,
    },
    {
        startOffset: 40,
        endOffset: 48,
        color: '#d9f593',
        priority: 2,
    },
    {
        startOffset: 56,
        endOffset: 64,
        color: '#f1ce90',
        priority: 4,
    }
];

//call the function
highlight(string, highlights);

function highlight(string, highlights)
{

    //sort the highlight objects by highest priority
    highlights.sort((a,b) => (a.priority > b.priority) ? 1 : -1);

    let highlightArea;
    let highlightedString = string;
    //loop through each object in the highlights array
    for (let i = 0; i < highlights.length; i++)
    {
        if(i>0)
        {
            switch (findOverlaps(highlights[i-1], highlights[i]))
            {
                case 'both':
                    //highlight left portion
                    highlightArea = string.substring(highlights[i].startOffset, highlights[i-1].startOffset);
                    let replaceString = "<mark style='background-color: " + highlights[i].color + ";'>" + highlightArea + "</mark>";
                    highlightedString = highlightedString.replace(highlightArea, replaceString);

                    //highlight right portion
                    highlightArea = string.substring(highlights[i-1].endOffset, highlights[i].endOffset);
                    break;
                case 'left':
                    highlightArea = string.substring(highlights[i].startOffset, highlights[i-1].startOffset);
                    break;
                case 'right':
                    highlightArea = string.substring(highlights[i-1].endOffset, highlights[i].endOffset);
                    break;
                default:
                    highlightArea = string.substring(highlights[i].startOffset, highlights[i].endOffset);
            }
        }
        else
        {
            //highlight the string for the lowest priority highlight
            highlightArea = string.substring(highlights[i].startOffset, highlights[i].endOffset);
        }

        //highlight the string
        let replaceString = "<mark style='background-color: " + highlights[i].color + ";'>" + highlightArea + "</mark>";
        highlightedString = highlightedString.replace(highlightArea, replaceString);

        //display the new highlighted string
        document.getElementById("text-area").innerHTML = highlightedString;
    }
}

function findOverlaps(highPriority, lowPriority)
{
    //if lower priority overlaps on both sides of higher priority
    if(lowPriority.startOffset <= highPriority.startOffset && lowPriority.endOffset >= highPriority.endOffset)
    {
        return 'both';
    }
    //if lower priority overlaps higher priority on left side
    else if(lowPriority.startOffset <= highPriority.startOffset &&
        lowPriority.endOffset >= highPriority.startOffset)
    {
        return 'left';
    }
    //if it overlaps on the right side
    else if(lowPriority.startOffset <= highPriority.endOffset &&
        lowPriority.endOffset >= highPriority.endOffset)
    {
        return 'right';
    }
    //no overlap
    else
    {
        return 'none';
    }
}