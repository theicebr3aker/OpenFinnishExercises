(function(){
	angular.module('open-finnish-lang').controller('resultsController', resultsController);
	
	resultsController.$inject = ['$rootScope'];
	
	function resultsController($rootScope){
		var self = this;
		self.correct = 0;
		self.total = 0;
		
		self.hasAnswered = false;
		self.isAnswerCorrect = false;
		
		$rootScope.$on('result.correct', function(){ processResult(true) });
		$rootScope.$on('result.false', function() { processResult(false) });
		$rootScope.$on('result.reset', function(){ reset(); });
		
		function processResult(isCorrect){
			console.log('processing', isCorrect);
			self.hasAnswered = true;
			
			if(isCorrect){
				self.correct++;
				self.isAnswerCorrect = true;
			}
			else 
				self.isAnswerCorrect = false;
			
			self.total++;
		}
		
		function reset(){
			self.hasAnswered = false;
		}
	}
})();
