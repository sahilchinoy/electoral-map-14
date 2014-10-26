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
	$(this).attr('stroke','black');
	$(this).attr('stroke-width',20);

	var this_race = data[$(this).attr('id')];
	update(this_race);
}

function removeBorder() {
	$(this).attr('stroke','none');
}

$('.district').mouseover(handle);
$('.district').mouseout(removeBorder);