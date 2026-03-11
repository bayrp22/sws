// Form handler for submitting lead data to Supabase
// Currently stubbed with console.log for development

interface FormPayload {
  name: string;
  bizName: string;
  email: string;
  url?: string;
  bizDesc?: string;
  path: "site" | "nosite";
  timestamp: string;
  language: "EN" | "ES";
}

export const formHandler = async (payload: FormPayload): Promise<void> => {
  try {
    // Log the payload for development
    console.log('Form submission payload:', payload);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual Supabase call
    /*
    const { data, error } = await supabase
      .from('forms.leads')
      .insert([
        {
          name: payload.name,
          business_name: payload.bizName,
          email: payload.email,
          website_url: payload.url || null,
          business_description: payload.bizDesc || null,
          form_path: payload.path,
          language: payload.language,
          submitted_at: payload.timestamp,
          created_at: payload.timestamp
        }
      ]);
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    console.log('Form submitted successfully:', data);
    */
    
    console.log('Form submitted successfully (simulated)');
    
  } catch (error) {
    console.error('Form submission failed:', error);
    throw error;
  }
}; 