---
layout: episode
tags:
  - episode
  - koser-sighting

title: Netflix Nets Orson Welles and Other News
number: 552
season: 7
podcast_url: http://thescifichristian.com/2017/03/episode-552-netflix-nets-orson-welles-and-other-news/
podcast_file_url: http://thescifichristian.com/sfc/sfc0552.mp3
date: 2017-03-24
length: '00:44:54'
category: news
hosts:
  - Ben
  - Matt

last_listen: 2023-04-11
recommendation: no
recommendation_reason: No need to listen to old news. Check the guide for what's interesting in hindsight.
---

You can watch Orson Welles's {% work "A Touch of Evil" %} as it was edited posthumously based on his notes.

The studio forced him to cut about an hour from {% work "The Magnificent Ambersons" %}.

Netflix is going to finish and release {% work "The Other Side of the Wind" %} from the half hour Welles edited in 1976 and the additional nine and a half hours of raw film.

Disney planned to open Avatar Land to coincide with the release of Avatar 2, but Avatar 2 will now not be released in 2018.

Both hosts liked {% work "LEGO Batman" %}.

Ridley Scott still wants to make {% work "Gladiator 2" %}. The original script had the Roman gods sending Maximus back to Earth to fight the Christians. When he instead defended them, they sentenced him to fight in every war, so the movie would be Maximus fighting the Crusades, Maximus fighting in World War 2, etc.

# Contest results

## Comic Book Characters
Brian Koser won: 10/10 with 3 in the correct positions

Matt was close: 9/10 with 3 in the correct positions

## Sci-Fi Characters
Brandon won: 8/20 points

Matt tied with Allan Reini for 2nd (5/20 points)

The hosts forgot what prizes they promised, so they asked the winners to remind them.

{% arc %}Well. The comic character prize was a comic book. It's been <span id="timeWaitingForPrize">years</span> since this episode aired, and every day I have gone to the mailbox thinking, maybe today is the day, only to be disappointed with flyers for car sales and coupons to the local grocery store.{% endarc %}

{% arc %}P.S. I enjoy playing the martyr more than reading comic books, so I did receive a prize after all.{% endarc %}

# Listener Feedback
Ben confused River Tam and River Song on the countdown.

<script>
  let updateDays = () => {
      const DateTime = luxon.DateTime;
      let date = DateTime.fromISO('2017-03-24');
      let diff = date.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds']);
      
      let timeWaitingForPrize = document.getElementById('timeWaitingForPrize');
      timeWaitingForPrize.innerHTML = `${Math.abs(diff.years)} years, ${Math.abs(diff.months)} months, ${Math.abs(diff.days)} days, ${Math.abs(diff.hours)} hours, ${Math.abs(diff.minutes)} minutes, and ${Math.abs(Math.floor(diff.seconds))} seconds`;
  };
  
  document.addEventListener('DOMContentLoaded', function () {
      setInterval(updateDays, 1000);
  });
</script>