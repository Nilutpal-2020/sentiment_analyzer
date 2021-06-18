import React from 'react';

import Navbar from '../Navbar/Navbar';

function About() {
    return (
        <div className="container text-center">
            <Navbar />
            <h1 className="display-4 text-center">About Sentiment Analysis</h1>
            <hr className="my-2" />
            <div id="list" className="list-group">
                <a className="list-group-item-action" href="#list-item-1">About Sentiment Analysis</a>
                <a className="list-group-item-action" href="#list-item-2">SVM</a>
                <a className="list-group-item-action" href="#list-item-3">Conclusion</a>
            </div>
            <div data-spy="scroll" data-target="#list" data-offset="0" className="scrollspy-example">
                <h4 id="list-item-1">About Sentiment Analysis</h4>
                <p>
                    Sentiment analysis is contextual mining of text which itentifies and extracts subjective information in
                    source material, and helping a business to understand the social sentiment of their brand, product or service
                    while monitoring online conversations. It uses natural language processing, text analysis, computatiional linguistics,
                    and biometrics to systematically identify, extract, quantify, and study affective states and subjective information.

                    A basic task in sentiment analysis is classifying the polarity of a given text at the document, sentence, or 
                    feature/aspect level - whether the expressed opinion in a document, a sentence or an entity feature/aspect is positive,
                    negative or neutral. 
                </p>
                <h4 id="list-item-2">SVM</h4>
                <p>
                    The objective of the support vector machine algorithm is to find a hyperplane in an N-dimensional space (N-
                    the number of features) that distinctly classifies the data points. To seperate the two classes of data points,
                    there are many possible hyperplanes that could be chosen. Our objective is to find a plane that has the maximum
                    margin, i.e. the maximum distance between data points of both classes. Maximizing the margin distance provides some
                    reinforcement so that future data points can be classified with more confidence.
                </p>
                <h4 id="list-item-3">Conclusion</h4>
                <p>
                    The age is getting meaningful insights from social media has now arrived with the advance in technology. In today's
                    environment where we're suffering from data overload (although this does not mean better or deeper insights), companies
                    might have mountains of customer feedback collected. Yet for mere humans, it's still impossible to analyze it manually
                    without any sort of erro or bias.

                    Sentiment analysis provides answers into what the most important issues are. Because sentiment analysis can be automated,
                    decisions can be made based on a significant amount of data rather than plain intuition that isn't always right.
                </p>
            </div>
        </div>
    )
}

export default About;