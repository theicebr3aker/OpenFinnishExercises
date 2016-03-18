(function(){
	angular.module('open-finnish-lang').service('caseService', caseService);
	
	function caseService(){
		var self = this;
		
		self.getSimpleSingularPartitive = function(word){
			if(word.endsWith("i")){
				if(_partitiveIEAExceptions.indexOf(word) !== -1){
					var idx = word.lastIndexOf("i");
					var postfix = isFrontVowelWord(word) ? "a" : "ä";
					return word.substring(0, idx) + "e" + postfix;
				}
				else if(_partitiveSiExceptionWords.indexOf(word) !== -1){
					var idx = word.lastIndexOf("si");
					var postfix = isFrontVowelWord(word) ? "tta" : "ttä";
					return word.substring(0, idx) + postfix;
				}
				else if(_partitiveINoneTaExceptions.indexOf(word) !== -1){
					var idx = word.lastIndexOf("i");
					var postfix = isFrontVowelWord(word) ? "ta" : "tä";
					return word.substring(0, idx) + postfix;
				}
				else return word + (isFrontVowelWord(word) ? "a" : "ä");
			}
			else if(word.endsWith("e")){
				var postfix = isFrontVowelWord(word) ? "tta" : "ttä";
				return word + postfix;
			}
			else if(word.endsWith("nen")){
				var idx = word.lastIndexOf("nen");
				return word.substring(0, idx) + "sta";
			}
			else if(word.endsWith("ia") || word.endsWith("ea")){
				return word + "a";
			}
			else if(word.endsWith("eä")){
				return word + "ä";
			}
			else if(/[aeioquyåäö]{2}$/.test(word) ||
				/[bcdfghjklmnprstvwxz]{1}$/.test(word)){
				var postfix = isFrontVowelWord(word) ? "ta" : "tä";
				return word + postfix;
			}
			else if(/[aeioquyåäö]{1}$/.test(word)){  //any other vowel ex
				var postfix = isFrontVowelWord(word) ? "a" : "ä";
				return word + postfix;
			}
			else throw new Error("Unknown word");  //to catch them all
		}
		
		//doesn't handle loadwords which don't respect vowel harmony
		function isFrontVowelWord(word){
			var isFront = /^[abcdefghijklmnopqrstuvwxz]+$/.test(word);
			return isFront;
		}
	}
})();
