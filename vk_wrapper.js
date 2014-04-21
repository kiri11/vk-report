/**
 * Very simple vk.com API JSONP wrapper
 * Allows to call public API functions without authentication.
 */
 
function vk_JSONP() {
    /**
     * Version of vkontakte API
     * @var String
     */
    var api_version = '5.21';
	
	  /**
     * URL of vkontakte API
     * @var String
     */
    var api_url = 'https://api.vk.com/method/';
	
    /**
     * Number of JSONP-callback function
     * @var Number
     */
    var cb_index = 0;
	
    /**
     * Perform XSS-request (load JavaScript).
     *
     * @param String url URL of JavaScript file to load and execute in
     *                   context of this page.
     */
    function requestScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
	  /**
     * Call Vkontakte API method.
     *
     * @param String method Method name to execute.
     * @param Object parameters Parameters of API method in the following
     *                          form:
     *                          {
     *                              name1: 'value 1',
     *                              name2: 'value 2',
     *
     *                              //arrays are also allowed
     *                              name3: [
     *                                  'array_value_1',
     *                                  'array_value_2',
     *                                  'array_value_3'
     *                              ]
     *                          }
     * @param Function onData Callback function to perform when answer from
     *                        API call comes from server. Function has the
     *                        only parameter - object with method call
     *                        results.
     */
    this.call = function(method_name, parameters, onData ) {

        //callback name
        var callback_name = onData.name + '_vk'+ (++cb_index);

        /**
         * Performs when browser gets server response to parse response and
         * call onData function. Located in window scope to be accessible
         * for loaded script.
         *
         * @param Object json JSON object which browser got from server,
         *                    already evaluated and ready for using.
         */
        window[callback_name] = function(json) {

            //call onData callback function
            if (onData != null) {
                onData(json);
            }
        };

        //append parameters with common strings
        parameters.v = api_version;
        parameters.callback = callback_name;

        //form URL to call
        var url = api_url + method_name + '?';
        for (var param in parameters) {
            url += param + '=' + encodeURIComponent(parameters[param]) + '&';
        }

        //load and execute script
        requestScript(url);
    }
}
