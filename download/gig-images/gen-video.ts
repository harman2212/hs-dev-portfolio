import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function generateVideo() {
  try {
    const zai = await ZAI.create();

    // Read gig image 3 (best rated)
    const imageBuffer = fs.readFileSync('/home/z/my-project/download/gig-images/gig-image-3.png');
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    console.log('Creating video generation task...');

    const task = await zai.video.generations.create({
      image_url: base64Image,
      prompt: 'Smooth cinematic camera pan revealing a professional web developer portfolio showcase with subtle glowing particle effects, dark tech aesthetic with blue and purple gradient accents, modern and premium feel, code floating in background',
      quality: 'quality',
      duration: 5,
      fps: 30,
      size: '1344x768'
    });

    console.log(`Task ID: ${task.id}`);
    console.log(`Status: ${task.task_status}`);

    // Poll for results
    const maxPolls = 60;
    const pollInterval = 8000;
    let result = await zai.async.result.query(task.id);
    let pollCount = 0;

    while (result.task_status === 'PROCESSING' && pollCount < maxPolls) {
      pollCount++;
      console.log(`Polling ${pollCount}/${maxPolls}: ${result.task_status}`);
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      result = await zai.async.result.query(task.id);
    }

    if (result.task_status === 'SUCCESS') {
      const videoUrl = result.video_result?.[0]?.url ||
                      result.video_url ||
                      result.url ||
                      result.video;
      console.log(`\nVideo URL: ${videoUrl}`);

      // Save result
      fs.writeFileSync('/home/z/my-project/download/gig-images/video-result.json', JSON.stringify(result, null, 2));
      console.log('Result saved to video-result.json');
    } else {
      console.log(`Task ended with status: ${result.task_status}`);
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateVideo();
