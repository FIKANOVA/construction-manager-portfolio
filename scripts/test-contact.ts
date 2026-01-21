const testSubmission = async () => {
    console.log('Testing contact form submission...');

    const data = {
        name: 'Test User',
        email: 'test@example.com',
        serviceType: 'gis',
        message: 'This is a test message to verify the API route.'
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Response status:', response.status);
        console.log('Response body:', result);

        if (response.status === 400 && result.error && result.error.name === 'MissingApiKeyError') {
            console.log('✅ TEST PASSED: API route is working but correctly identified missing RESEND_API_KEY.');
        } else if (response.ok) {
            console.log('✅ TEST PASSED: Submission successful.');
        } else {
            console.log('❌ TEST FAILED:', result.error || 'Unknown error');
        }
    } catch (error) {
        console.log('❌ TEST ERROR: Could not connect to dev server. Make sure "npm run dev" is running.');
    }
};

testSubmission();
