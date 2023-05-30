
const Question = require('../../../models/question');
const Option = require('../../../models/option');


/**
 * create a question 
 * takes the title from body of request
 * check if question is already exist or not
 * if question is not already exist we create a question with given title
 */
module.exports.create = async function (req, res) {

    try {

        const { title } = req.body;
        const existingQuestion = await Question.findOne({ 'title': title });

        if (existingQuestion) {
            return res.status(401).json({
                message: 'Question is already exist',
                status: 'failure',
                data: [{ id: existingQuestion._id }]
            });
        };

        const question = await Question.create({ 'title': title });

        return res.status(200).json({
            message: 'Question create',
            status: 'successful',
            data: [question]
        });

    } catch (error) {
        console.log('ERROR CREATING QUESTION: ', error);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });
    }

}

/**
 * delete a question
 * takes question id from request parameters
 * check if question id is valid or not
 * if id is valid we first delete all the options of question and then delete question from db
 */
module.exports.delete = async function (req, res) {



    try {

        const questionId = req.params.id;

        if (!questionId) {
            return res.status(404).json({
                message: 'Empty Question id',
                status: 'failure',
                data: []
            });
        };

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                message: 'Invalid Question id',
                status: 'failure',
                data: []
            });
        };

        await Option.deleteMany({ '_id': { $in: question.options } });
        await Question.findByIdAndDelete(questionId);


        return res.status(200).json({
            message: 'Quesion deleted',
            status: 'successful',
            data: []
        });


    } catch (error) {
        console.log("ERROR DELETE QUESTION ", error);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });
    }


}


/**
 * get details of question
 * takes the question id from parameters
 * check if it is valid or not
 * populate the options array and send it to the user
 */
module.exports.getQuestion = async function (req, res) {
    try {

        const questionId = req.params.id;

        if (!questionId) {
            return res.status(404).json({
                message: 'Empty Question id',
                status: 'failure',
                data: []
            });
        };

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                message: 'Invalid Question id',
                status: 'failure',
                data: []
            });
        };

        await question.populate({ path: 'options', select: '-question_id' });

        return res.status(200).json({
            message: 'question fetched',
            status: 'successful',
            data: [question]
        })


    } catch (error) {
        console.log("ERROR GET QUESTION ", error);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });
    }
} 