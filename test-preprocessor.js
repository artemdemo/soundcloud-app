/**
 * Jest preprocessor for tests
 * basic example is here: https://facebook.github.io/jest/docs/tutorial-react.html#rolling-your-own-preprocessor
 * I'm using separate preprocessor and not the simple approach, case
 * I want to define presets and plugins, otherwise it is not working
 */

'use strict';
var babel = require('babel-core');

module.exports = {
    process: function (src, filename) {

        // Ignore all files within node_modules
        if (filename.indexOf('node_modules') === -1 && babel.util.canCompile(filename)) {
            return babel.transform(src, {
                filename: filename,
                retainLines: true,
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties'],
                auxiliaryCommentBefore: 'istanbul ignore next'
            }).code;
        }

        return src;
    }
};
