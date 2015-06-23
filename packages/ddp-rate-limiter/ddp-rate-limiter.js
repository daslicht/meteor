// Rate Limiter built into DDP
DDPRateLimiter = {}

DDPRateLimiter.RateLimiter = new RateLimiter();

// Add a default rule of limiting logins to 5 times per 10 seconds by IP address.
// Override using DDPRateLimiter.config
DDPRateLimiter.RateLimiter.addRule( {
  userId: null,
  IPAddr: function( IPAddr ) {
    return true;
  },
  type: 'method',
  name: 'login'
}, 5, 10000 );

// DDPRateLimiter.RateLimiter.addRule( {
//   userId: null,
//   IPAddr: function (IPAddr) {
//     return true;
//   },
//   type: 'sub',
//   name: null
// }, 5, 10000);

DDPRateLimiter.getErrorMessage = function( rateLimitResult ) {
  return "Error, too many requests. Please slow down. You must wait " + Math.ceil(
    rateLimitResult.timeToReset / 1000 ) + " seconds before trying again.";
}

DDPRateLimiter.config = function( rules ) {
  DDPRateLimiter.RateLimiter.rules = rules;
};

DDPRateLimiter.addRule = function( rule, numRequests, intervalTime ) {
  DDPRateLimiter.RateLimiter.addRule( rule, numRequests, intervalTime );
};