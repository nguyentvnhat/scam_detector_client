// Vercel Serverless Function for handling donate form submissions
// This file should be in the /api directory for Vercel to recognize it

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface DonateFormData {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  contributionTypes: string[];
  skills: string[];
  timeCommitment: string;
  referralLink?: string;
  notes?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: DonateFormData = req.body;

    // Basic validation
    if (!formData.fullName || !formData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Option 1: Save to database (e.g., Supabase, MongoDB)
    // Uncomment and configure based on your database choice:
    
    // Example with Supabase:
    // const { createClient } = require('@supabase/supabase-js');
    // const supabase = createClient(
    //   process.env.SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // );
    // const { error } = await supabase
    //   .from('donate_submissions')
    //   .insert([{ ...formData, submitted_at: new Date().toISOString() }]);
    // if (error) throw error;

    // Option 2: Send email notification
    // Using Resend (https://resend.com) - free tier available
    const emailPayload = {
      from: process.env.EMAIL_FROM || 'noreply@blacklist.vn',
      to: process.env.EMAIL_TO || 'hello@blacklist.vn',
      subject: `New Donation Form Submission from ${formData.fullName}`,
      html: `
        <h2>New Donation Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
        ${formData.organization ? `<p><strong>Organization:</strong> ${formData.organization}</p>` : ''}
        <p><strong>Contribution Types:</strong> ${formData.contributionTypes.join(', ')}</p>
        <p><strong>Skills:</strong> ${formData.skills.join(', ')}</p>
        <p><strong>Time Commitment:</strong> ${formData.timeCommitment}</p>
        ${formData.referralLink ? `<p><strong>Referral Link:</strong> <a href="${formData.referralLink}">${formData.referralLink}</a></p>` : ''}
        ${formData.notes ? `<p><strong>Notes:</strong><br>${formData.notes.replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p><em>Submitted at: ${new Date().toISOString()}</em></p>
      `,
    };

    // If using Resend (recommended):
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send(emailPayload);

    // For now, just log it (in production, implement actual email sending)
    console.log('Donation form submission:', formData);

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
    });
  } catch (error) {
    console.error('Error processing donation form:', error);
    return res.status(500).json({
      error: 'Failed to process form submission',
    });
  }
}

