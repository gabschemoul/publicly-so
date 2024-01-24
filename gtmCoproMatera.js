console.log("1")
  document.addEventListener('DOMContentLoaded', () => {
    console.log("2")
    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('.ga4-event').forEach(item => {
        item.addEventListener('click', () => {
            window.dataLayer.push({
            		'step_name': 'lead_form_display_essential_0',
                'step_choice': 'lead_type_president_du_conseil_syndical',
                'page_type': 'lead_form_copro'
            });
        });
    });
  });
