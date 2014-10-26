function update(raceInfo) {
	$('#district_name').html(raceInfo.district);
	$('#challenger').html(raceInfo.challenger.candidateName);
	$('#incumbent').html(raceInfo.incumbent.candidateName);
	$('#cTitle').html(raceInfo.challenger.candidateTitle);
	$('#iTitle').html(raceInfo.incumbent.candidateTitle);
	$('#cStatement').html(raceInfo.challenger.statement);
	$('#iStatement').html(raceInfo.incumbent.statement);
}

function handle() {
	var this_race = data[$(this).attr('id')];
	update(this_race);
}

$('.district').mouseover(handle);