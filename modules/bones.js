//Resetting variables
rShouldBoneShrine = false;
rBoneShrineUsedZone = 0;

function BoneShrine() {

    var rRunningC3 = game.global.runningChallengeSquared || game.global.challengeActive == 'Mayhem' || game.global.challengeActive == 'Pandemonium';
	var rRunningDaily =  game.global.challengeActive == "Daily";
    var rRunningRegular = game.global.challengeActive != "Daily" && game.global.challengeActive != "Mayhem" && game.global.challengeActive != "Pandemonium" && !game.global.runningChallengeSquared;
    
    if (rBoneShrineUsedZone != 0 && rBoneShrineUsedZone != game.global.world)
	    rBoneShrineUsedZone = 0;
	//Setting up variables
    var rBoneShrineZone = getPageSetting('rBoneShrineZone');

    if (rBoneShrineZone.includes(game.global.world)) {
    	var rBoneShrineRunType = getPageSetting('rBoneShrineRunType')
        let indexes = [...finder(getPageSetting('rBoneShrineZone'), game.global.world)];
        var rBSIndex;
        for (var y = 0; y < indexes.length; y++) {
            if (rBoneShrineRunType[indexes[y]] == 'All') {
                rBSIndex = indexes[y];
                break;
            }
            if (rBoneShrineRunType[indexes[y]] == 'Fillers' && rRunningRegular) {
                rBSIndex = indexes[y];
                break;
            }
            else if (rBoneShrineRunType[indexes[y]] == 'Daily' && rRunningDaily) {
                rBSIndex = indexes[y];
                break;
            }
            else if (rBoneShrineRunType[indexes[y]] == 'C3' && rRunningC3) {
                rBSIndex = indexes[y];
                break;
            }
        }
    	//var rBoneShrineRunType = rBoneShrineSettings.boneruntype;
        var rBoneShrineRunType = getPageSetting('rBoneShrineRunType')[rBSIndex];
    	var runType = rBoneShrineRunType == 'Fillers' && rRunningRegular ? true :
    					rBoneShrineRunType == 'Daily' && rRunningDaily ? true : 
    					rBoneShrineRunType == 'C3' && rRunningC3 ? true :
    					rBoneShrineRunType == 'All' ? true :
    					false;

    	if (runType && getPageSetting('rBoneShrine') && rBoneShrineUsedZone != game.global.world) {
            var rBoneShrineSettings = autoTrimpSettings.rBoneShrineSettings.value[rBSIndex]
            var rBoneShrineCell = rBoneShrineSettings.cell
    		var rBoneShrineCharges = rBoneShrineSettings.boneamount
    		var rBoneShrineGather = rBoneShrineSettings.gather
    		var rBoneShrineSpendBelow = rBoneShrineSettings.bonebelow === -1 ? 0 : rBoneShrineSettings.bonebelow;
            var count = 0;
    		rShouldBoneShrine = (game.global.lastClearedCell + 2 >= rBoneShrineCell && game.permaBoneBonuses.boosts.charges > rBoneShrineSpendBelow);
            
    		if (rShouldBoneShrine) {
    			setGather(rBoneShrineGather);
    			if (getPageSetting('Rhs' + rBoneShrineGather[0].toUpperCase() + rBoneShrineGather.slice(1) + 'Staff') !== 'undefined')
    				HeirloomEquipStaff('Rhs' + rBoneShrineGather[0].toUpperCase() + rBoneShrineGather.slice(1) + 'Staff');
    			else if (getPageSetting('RhsGeneralStaff') !== 'undefined')
    				HeirloomEquipStaff('RhsGeneralStaff');
    	        for (var x = 0; x < rBoneShrineCharges; x++) {
                    if (rBoneShrineCharges >= game.permaBoneBonuses.boosts.charges) continue;
                    workerRatio = rBoneShrineSettings.jobratio;
                    RbuyJobs()
                    count = x+1;
    				game.permaBoneBonuses.boosts.consume()
    			}
    			debug('Consumed ' + count + " bone shrine " + (count == 1 ? "charge on zone " : "charges on zone ") + game.global.world);
    			rBoneShrineUsedZone = game.global.world;
    		}
	    }
    }
}

function BuySingleRunBonuses() {
	if (game.global.runningChallengeSquared || game.global.challengeActive == 'Mayhem' || game.global.challengeActive == 'Pandemonium') {
		if ((getPageSetting('c3GM_ST') == 1 || getPageSetting('c3GM_ST') == 3) && !game.singleRunBonuses.goldMaps.owned && game.global.b >=20) 
			purchaseSingleRunBonus('goldMaps');
		if ((getPageSetting('c3GM_ST') == 2 || getPageSetting('c3GM_ST') == 3)  && !game.singleRunBonuses.sharpTrimps.owned && game.global.b >=25) 
			purchaseSingleRunBonus('sharpTrimps');
	}
}

function PurchasePerkRespec() {
    //Obtains a respec if one isn't available by buying a bone portal. Be warned will use 100 bones to do so
    if (!game.global.canRespecPerks && game.global.b >= 100) {
        showBones();
        tooltip('Confirm Purchase', null, 'update', 'You are about to purchase one Instant Portal for 100 bones. Your new helium will appear in the View Perks menu at the bottom of the screen. Is this what you wanted to do?', 'purchaseMisc(\'helium\')', 100);
        hideBones();
        debug("Bone portal respec purchased");
    }
}

function PandemoniumPerkRespec() {
    //Setting up pandGoal variable.
    pandGoal =  typeof(pandGoal) == 'undefined' && getPageSetting('rPandRespecZone') == -1 ? "NEG" : 
                typeof(pandGoal) == 'undefined' && game.global.world < getPageSetting('rPandRespecZone') ? 0 : 
                typeof(pandGoal) == 'undefined' && game.challenges.Pandemonium.pandemonium > 0 ? "destacking" : 
                typeof(pandGoal) == 'undefined' && game.challenges.Pandemonium.pandemonium == 0 && game.upgrades.Speedminer.done == game.global.world ? "jestFarm" : 
                typeof(pandGoal) == 'undefined' ? 0 :
                pandGoal;

    if (getPageSetting('rPandRespecZone') != -1 && getPageSetting('rPandRespecZone') <= game.global.world && getPageSetting('RPandemoniumAutoEquip') > 1 && 
    getPageSetting('RhsPandStaff') != "undefined" && (game.global.StaffEquipped.name == getPageSetting('RhsPandStaff') || HeirloomSearch('RhsPandStaff') != undefined) && 
    (getPageSetting('RPandemoniumAEZone') > 5 && game.global.world >= getPageSetting('RPandemoniumAEZone')) && 
    (getPageSetting('RPandemoniumZone') > 5 && game.global.world >= getPageSetting('RPandemoniumZone'))) {
        //Purchases a respec if one isn't currently available.
        if (!game.global.canRespecPerks && game.global.world < 150) {
            PurchasePerkRespec();
        }
        
        //Respecs to preset 2 if you're currently destacking.
        if (rShouldPandemoniumDestack) {
            if (pandGoal != "destacking") {
                PerkRespec(2)
                pandGoal = "destacking";
            }
        }
        
        //Respecs to preset 3 if you should equip farm.
        if (game.challenges.Pandemonium.pandemonium == 0 && game.upgrades.Speedminer.done == game.global.world) {
            if (pandGoal != "jestFarm") {
                PerkRespec(3)
                pandGoal = "jestFarm";
				savefile = null;
            }
        }
    }
}