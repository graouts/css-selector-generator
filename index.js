
function isElement(node)
{
    return node.nodeType === Node.ELEMENT_NODE;
}

function parents(node)
{
    var nodes = [];
    var currentNode = node;
    while (isElement(currentNode)) {
        nodes.push(currentNode);
        currentNode = currentNode.parentNode;
    }
    return nodes;
}

function tagSelector(element)
{
    return element.localName.toLowerCase();
}

function idSelector(element)
{
    var id = element.getAttribute("id");
    return id ? "#" + id : null;    
}

function classSelectors(element)
{
    var selectors = [];
    var classList = element.classList;
    for (var i = 0, count = classList.length; i < count; ++i)
        selectors.push("." + classList[i]);
    return selectors;
}

function attributeSelectors(element)
{
    var selectors = [];
    var attributes = element.attributes;
    for (var i = 0, count = attributes; i < count; ++i) {
        var attribute = attributes[i];
        if (attribute === "id" || attribute === "class")
            continue;
        selectors.push("[" + attribute.nodeName + "=" + attribute.nodeValue + "]");
    }
    return selectors;
}

function nthChildSelector(element)
{
    var parent = element.parentNode;
    if (!parent)
        return null;

    var count = 1;
    var child = parent.firstElementChild;
    while (child !== element) {
        child = child.nextElementSibling;
        count++;
    }
    return ":nth-child(" + count + ")";
}

function testSelector(element, selector)
{
    if (!selector)
        return false;
    
    var elements = element.ownerDocument.querySelectorAll(selector);
    return elements.length === 1 && elements[0] === element;
}

function testUniqueness(element, selector)
{
    var elements = element.parentNode.querySelectorAll(selector);
    return elements.length === 1 && elements[0] === element;
}

function uniqueSelector(element)
{
    var id = idSelector(element);
    if (id)
        return id;

    var tag = tagSelector(element);
    if (testUniqueness(element, tag))
        return tag;

    var classes = classSelectors(element);
    if (classes.length) {
        var allClasses = classes.join();
        if (testUniqueness(element, allClasses))
            return allClasses;
        var tagAndClass = tag + allClasses;
        if (testUniqueness(element, tagAndClass))
            return tagAndClass;
    }

    return nthChildSelector(element);
}

module.exports = function(element)
{
    if (!element || !element.parentNode)
        return;

    var selectors = [];
    parents(element).forEach(function(parent) {
        var selector = uniqueSelector(parent);
        if (selector)
            selectors.push(selector);
    });

    if (!selectors.length)
        return;

    var selector = selectors[0];
    for (var i = 0, count = selectors.length; i < count; ++i) {
        if (i > 0)
            selector = selectors[i] + " > " + selector;
        if (testSelector(element, selector))
            return selector;
    }
}
