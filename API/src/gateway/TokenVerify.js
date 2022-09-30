const jwt = require('jsonwebtoken');

function TokenVerify(req) {
    if (typeof req.body.token !== 'undefined' && req.body.token) {
        try {
            const decodedToken = jwt.verify(req.body.token, '%hx5g@BdocPDX4D^P#owO#11tg5R$RX#');
            const userId = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                return -1;
            } else {
                return 0;
            }
        } catch (err) {
            return -1;
        }
    } else {
        return -1;
    }
}

function TokenGetInfo(req) {
    const decodedToken = jwt.verify(req.body.token, '%hx5g@BdocPDX4D^P#owO#11tg5R$RX#');
    return decodedToken;
}

module.exports = {
    TokenVerify,
    TokenGetInfo,
}