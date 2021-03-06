import alt from '../alt';
import * as promise from 'es6-promise';
import axios from 'axios';

promise.polyfill();

const StyleCheckerReportSource = (alt) => {
  return {
    performQualityCheck: {
      remote(state) {
        return axios.post('submitSourceCode', {
          sourceCode: state.sourceCode
        }).then((response) => {
          if(response.data.error != null) {
            throw new Error(response.error.code + ': ' + response.error.message);
          }
          return response.data;
        }).catch((response) => {
          console.log(response);
          throw new Error('500 Internal Server Error');
        });
      },

      success: alt.actions.SubmitSourceCodeAction.fetchStyleCheckerReportSuccess,
      error: alt.actions.SubmitSourceCodeAction.fetchStyleCheckerReportFailed,

      // (optional)
      // Should fetch has precedence over the value returned by local in determining 
      // whether remote should be called. In this particular example if the value is 
      // present locally it would return but still fire off the remote request.
      shouldFetch(state) {
        return true;
      }
    }
  };
};

export default StyleCheckerReportSource;