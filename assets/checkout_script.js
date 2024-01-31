

const freeCommercialSelector = 'label>span[data-shipping-method-label-title="5+ Business Days - Commercial Address"]',
      freeResidentialSelector = 'label>span[data-shipping-method-label-title="5+ Business Days - Residential Address"]',
      expeditedCommercialSelector = 'label>span[data-shipping-method-label-title="3-4 Business Days - Commercial Address"]',
      expeditedResidentialSelector = 'label>span[data-shipping-method-label-title="3-4 Business Days - Residential Address"]',
      freeDropShipCommercialSelector = 'label>span[data-shipping-method-label-title="5+ Business Days - Commercial Address"]',
      freeDropShipResidentialSelector = 'label>span[data-shipping-method-label-title="5+ Business Days - Residential Address"]',
      dropShipCommercialSelector = 'label>span[data-shipping-method-label-title="6-10 Business Days - Commercial Address"]',
      dropShipResidentialSelector = 'label>span[data-shipping-method-label-title="6-10 Business Days - Residential Address"]',
      mostPopularOption = 'label>span[data-shipping-method-label-title="2-4 Business Days (MOST POPULAR)"]'
      ;
      
//     document.getElementById('checkout_shipping_address_first_name').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_last_name').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_address1').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_address2').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_company').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_city').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_province').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_zip').setAttribute('maxlength', '50');
//     document.getElementById('checkout_shipping_address_phone').setAttribute('maxlength', '50');

// function displayAllRates() {
//   jQuery(expeditedResidentialSelector).parent().parent().parent().show();
//   jQuery(freeResidentialSelector).parent().parent().parent().show();
//   jQuery(expeditedCommercialSelector).parent().parent().parent().show();
//   jQuery(freeCommercialSelector).parent().parent().parent().show();
//   jQuery(freeDropShipCommercialSelector).parent().parent().parent().show();
//   jQuery(freeDropShipResidentialSelector).parent().parent().parent().show();
// }

function hideAllRates() {
  jQuery(expeditedResidentialSelector).parent().parent().parent().hide();
  jQuery(freeResidentialSelector).parent().parent().parent().hide();
  jQuery(expeditedCommercialSelector).parent().parent().parent().hide();
  jQuery(freeCommercialSelector).parent().parent().parent().hide();
  jQuery(freeDropShipCommercialSelector).parent().parent().parent().hide();
  jQuery(freeDropShipResidentialSelector).parent().parent().parent().hide();
  jQuery(dropShipCommercialSelector).parent().parent().parent().hide();
  jQuery(dropShipResidentialSelector).parent().parent().parent().hide();
}

function displayCommercialRates() {
  // Hide residential rates
  jQuery(expeditedResidentialSelector).parent().parent().parent().hide();
  jQuery(freeResidentialSelector).parent().parent().parent().hide();
  jQuery(freeDropShipResidentialSelector).parent().parent().parent().hide();
  jQuery(dropShipResidentialSelector).parent().parent().parent().hide();

  // Show commercial rates
  let bestValue = jQuery(mostPopularOption);
  bestValue.parent().parent().parent().show();
  bestValue.trigger("click");
  jQuery(expeditedCommercialSelector).parent().parent().parent().show();
  jQuery(freeCommercialSelector).parent().parent().parent().show();
  jQuery(freeDropShipCommercialSelector).parent().parent().parent().show();
  jQuery(dropShipCommercialSelector).parent().parent().parent().show();
}

// function displayResidentialRates() {
//   // Hide commercial rates
//   jQuery(expeditedCommercialSelector).parent().parent().parent().hide();
//   jQuery(freeCommercialSelector).parent().parent().parent().hide();
//   jQuery(freeDropShipCommercialSelector).parent().parent().parent().hide();
//   jQuery(dropShipCommercialSelector).parent().parent().parent().hide();

  // Show residential rates
  let bestValue = jQuery(expeditedResidentialSelector);
  bestValue.parent().parent().parent().show();
  bestValue.trigger("click");
  jQuery(expeditedResidentialSelector).parent().parent().parent().show();
  jQuery(freeResidentialSelector).parent().parent().parent().show();
  jQuery(freeDropShipResidentialSelector).parent().parent().parent().show();
  jQuery(dropShipResidentialSelector).parent().parent().parent().show();
}

function revealTaxInfo() {
  let taxInfoShadow = document.getElementById('tax-info-shadow');
  taxInfoShadow.classList.toggle('visible');
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openDropdown() {
  jQuery('#myDropdown').toggleClass("show"); 
}
jQuery('#address-validator-overlay #drop-down').click(openDropdown);

function _shippingLoaded() {
  //Make the default button "2-4 Business Days (MOST POPULAR)"
  
  if (jQuery('[name="checkout[shipping_rate][id]"]').length == false) {
    
    setTimeout(_shippingLoaded, 100);
  } else {
    // Hide all of the rates until we can find the right ones to display.
    hideAllRates();

    jQuery('span[data-shipping-method-label-title="FedEx Ground"]').text('3-4 Business Days (MOST POPULAR)');
    jQuery('span[data-shipping-method-label-title="FedEx 2 Day"]').text('Expedited 2-3 Day');
    jQuery('span[data-shipping-method-label-title="FedEx Standard Overnight"]').text('Expedited 1-2 Day');
    
    

    // Check the correct button
    if (jQuery('span[data-shipping-method-label-title="2-4 Business Days (MOST POPULAR)"]').is(":visible")) {
      document.getElementsByClassName('input-radio')[1].checked = true;
      moveCheckoutRowsToDropdown();
    } 
    if (jQuery('span[data-shipping-method-label-title="FedEx Ground"]').is(":visible")) {
      
      document.getElementsByClassName('input-radio')[2].checked = true;
      moveCheckoutRowsToDropdown();
    }

    function moveCheckoutRowsToDropdown() {
      // TODO: Adjust the padding on button click (and before a little bit).
      // ...also, make the button style match the page.
      const parent = document.querySelector('fieldset.content-box')
      // Create a dropdown element to move elements into
      const dropdownParent = document.createElement('div');
      dropdownParent.className = 'checkout-dropdown-wrapper';
      const dropdownButton = document.createElement('span');
      dropdownButton.onclick = (e) => {
        // Switch between open dropdown and closed drowndown
        document.getElementById('checkout-dropdown').classList.toggle('show-checkout-option');
        // When the dropdown is open add additional bottom padding to the shipping box
        document.querySelector('fieldset.content-box').classList.toggle('additional-bottom-padding');
        document.querySelector('fieldset.content-box').classList.toggle('default-bottom-padding');
        // Render the placeholder gap (elements) to prevent overlapping elements
        for (const element of document.getElementsByClassName('checkout-placeholder')) {
          element.classList.toggle('invisible-placeholder')
        }
        // Update the button name accordingly
        if (e.target.innerText === 'More Shipping Options') {
          e.target.innerText = 'Hide Additional Shipping Options'
        } else {
          e.target.innerText = 'More Shipping Options';
        }
      }
      dropdownButton.id = 'checkout-options-btn';
      dropdownButton.innerText = 'More Shipping Options';
      const dropdownChildren = document.createElement('div');
      dropdownChildren.className = 'checkout-dropdown-options';
      dropdownChildren.id = 'checkout-dropdown';
      // Assign element lineage
      parent.appendChild(dropdownParent);
      dropdownParent.appendChild(dropdownButton);
      dropdownParent.appendChild(dropdownChildren);

      // Filter out all options that aren't the default - moving them into the dropdown
      const placeholders = []; // Placeholder elements for styling
      const children = [...(parent.children)].filter(el => el.className === 'content-box__row');
      for (const element of children) {
        const target1 = [...(element.children)].find(el => el.className === 'radio-wrapper');
        if (target1) {
          const target2 = [...(target1.children)].find(el => el.className === 'radio__input');
          if (target2) {
            const target3 = [...(target2.children)].find(el => el.checked);
            if (!target3) { // If it's not selected then move it into a dropdown
              parent.removeChild(element);
              const hidden = element.cloneNode(true);
              hidden.style = 'visibility: hidden;';
              hidden.classList.add('invisible-placeholder');
              hidden.classList.add('checkout-placeholder');
              placeholders.push(hidden);
              dropdownChildren.appendChild(element);
            }
          }
        }
      }
      // This adds placeholder elements that expand the shipping box when the
      // dropdown is opened.
      for (const element of placeholders) {
        parent.appendChild(element);
      }
      // Add padding to the shipping box
      document.querySelector('fieldset.content-box').classList.toggle('default-bottom-padding');
    }

    // Change labels
    //jQuery('span[data-shipping-method-label-title="5+ Business Days - Commercial Address"]')
      //.text('-4 Business Days - Commercial Address (BEST VALUE)');

    //jQuery('span[data-shipping-method-label-title="3-4 Business Days - Residential Address"]')
     // .text('3-4 Business Days - Residential Address (BEST VALUE)');

    var shippingAddress = document.querySelector('#shipping-address').dataset;

    /**Code for address classification -Not in use*/
    // const request = new Request('https://api.frozendessertsupplies.company/get-address-classification', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json',
    //   'SierraMadreApiKey':'qIwGg8q76B7yYvltPTYkkbnEviyFeW2sKsUpNcw8pu1JxX9BdVW9PipbmPXS5pU1'},
    //   body: JSON.stringify(shippingAddress)
    // });

    // fetch(request)
    //   .then(response => {
    //     if (response.status === 200) {
    //       response.json().then((parsedJson) => {
    //         switch (parsedJson.code) {
    //           case 1:
    //             displayCommercialRates();
    //             break;
    //           default:
    //             if (jQuery('span[data-shipping-method-label-title="6-10 Business Days - Commercial Address"]').is(":hidden")) {
    //               document.getElementsByClassName('input-radio')[1].checked = true;
    //             }
    //             displayResidentialRates();
    //         }
    //       });
    //     } else {
    //       displayResidentialRates();
    //       throw new Error('Something went wrong on api server!');
    //     }
    //   })
    //   .catch(error => {
    //     displayAllRates();
    //     console.error(error);
    //   });
        displayCommercialRates();
  }
}

let correctedAddresses = [];

if (Shopify.Checkout.step == 'shipping_method') {
  
  
  //jQuery('div.section.section--shipping-method>div.section__header').append('<a href="/pages/shipping" target="blank"><i class="shipping-info-icon">i</i></a>');
  _shippingLoaded();

  // Inject a custom CSS script to the checkout page.
  // Fun fact: The checkout page doesn't use our theme.css.liquid CSS styles.
  var css = `#checkout-options-btn {
    color: #26bfcb;
    padding: 8px;
    font-size: 12px;
    border: 1px solid #26bfcb;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 32px;
    margin-left: 16px;
    /* Disable text selection on click */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  /* Hover effects (not implemented)
  #checkout-options-btn:hover,
  #checkout-options-btn:focus {
    background-color: #2980B9;
  } */
  .checkout-dropdown-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-left: 16px;
    /* Disable text selection on click */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  .checkout-dropdown-options {
    display: none;
    position: absolute;
    margin-top: 24px;
    width: calc(100% - 32px); /* Accounts for left padding */
    min-width: 160px;
    z-index: 1;
  }
  .checkout-dropdown-options div {
    text-decoration: none;
    display: block;
  }
  .checkout-dropdown-options div:hover {
    background-color: #ddd;
  }
  .show-checkout-option {
    display: block;
  }
  .invisible-placeholder {
    display: none !important;
  }
  .default-bottom-padding {
    padding-bottom: 24px;
  }
  .additional-bottom-padding {
    padding-bottom: 36px;
  }`;
  injectCSS(css);
}

function addressValidatorGetShippingAddressHTML(candidate) {
  let htmlString = !candidate.changes || candidate.changes.length === 0 ?  '<div class="address">'
    :`<div class="address" onclick="updateAddressFromVanillaClickAndSubmit(event)" data-changes="${JSON.stringify(candidate.changes).replace(/"/g, "'")}" valid="${candidate.valid}">`;
  htmlString += `
            <span class="address1">${candidate.address.address1}</span>
            <span class="address2">${candidate.address.address2}</span>
            <div>
                <span class="city">${candidate.address.city}</span>,
                <span class="provinceCode">${candidate.address.provinceCode}</span>
                <span class="zip">${candidate.address.zip}</span>
            </div>
        </div>
    `;
  return htmlString;
}

function candidateHoverOffHandler(ev) {
  jQuery(`#address-validator-popup .addresses>.original .displayChange`).removeClass('displayChange');
}

function candidateHoverInHandler(ev) {
  let dataString = jQuery(ev.currentTarget).data('changes');
  let changes = JSON.parse(dataString.replace(/'/g, '"'));
  // for (let change of changes) {
  //   jQuery(`#address-validator-popup .addresses>.original .${change.field}`).addClass('displayChange');
  // }
}

function updateAddressFromClickAndSubmit() {
  jQuery('#address-validator-overlay').removeClass('visible');
  jQuery('#continue_button').addClass('btn--loading');
  document.getElementById('checkout_shipping_address_address1').value = jQuery(this).find('.address1').text();
  document.getElementById('checkout_shipping_address_address2').value = jQuery(this).find('.address2').text();
  document.getElementById('checkout_shipping_address_city').value = jQuery(this).find('.city').text();
  document.getElementById('checkout_shipping_address_province').value = jQuery(this).find('.provinceCode').text();
  document.getElementById('checkout_shipping_address_zip').value = jQuery(this).find('.zip').text();
  jQuery('.addresses').removeClass('visible');
  jQuery('#address-validator-popup').data('validated', true);
  jQuery('.main__content>.step>.edit_checkout').submit();
}

function updateAddressFromVanillaClickAndSubmit(e) {
  let element = e.target;
  while (element.className !== 'address') {
    element = element.parentElement;
  }
  const [address1, address2, div] = element.children;
  const [city, state, zip] = div.children;
  jQuery('#address-validator-overlay').removeClass('visible');
  jQuery('#continue_button').addClass('btn--loading');
  document.getElementById('checkout_shipping_address_address1').value = address1.innerText;
  document.getElementById('checkout_shipping_address_address2').value = address2.innerText;
  document.getElementById('checkout_shipping_address_city').value = city.innerText;
  document.getElementById('checkout_shipping_address_province').value = state.innerText;
  document.getElementById('checkout_shipping_address_zip').value = zip.innerText;
  jQuery('.addresses').removeClass('visible');
  jQuery('#address-validator-popup').data('validated', true);
  jQuery('.main__content>.step>.edit_checkout').submit();
}

function updateAddressAndSubmit() {
  jQuery('#address-validator-overlay').removeClass('visible');
  jQuery('#continue_button').addClass('btn--loading');
  document.getElementById('checkout_shipping_address_address1').value = correctedAddresses[0].address.address1.trim();
  document.getElementById('checkout_shipping_address_address2').value = correctedAddresses[0].address.address2.trim();
  document.getElementById('checkout_shipping_address_city').value = correctedAddresses[0].address.city.trim();
  document.getElementById('checkout_shipping_address_province').value = correctedAddresses[0].address.provinceCode.trim();
  document.getElementById('checkout_shipping_address_zip').value = correctedAddresses[0].address.zip.trim();
  jQuery('.addresses').removeClass('visible');
  jQuery('#address-validator-popup').data('validated', true);
  jQuery('.main__content>.step>.edit_checkout').submit();
}

jQuery('#cancel-button').click(() => {
  jQuery('#address-validator-overlay').removeClass('visible');
  jQuery('#address-validator-popup .candidates-wrapper>h4').text('');
  jQuery('#address-validator-popup #candidates').empty();
  jQuery('#address-validator-popup .addresses>.original>.address').empty();
  jQuery('#continue_button').prop('disabled', false);
  jQuery('.addresses').removeClass('visible');
  jQuery('#address-validator-popup').data('secondAttempt', true);
});

jQuery('#proceed').click(() => {
  let acknowledged = document.getElementById('acknowledgement_checkbox').checked;
  if (acknowledged){
    jQuery('#address-validator-popup').data('validated', true);
    jQuery('.main__content>.step>.edit_checkout').submit();
  }else{
    alert("Please accept this policy before continuing.")
  }
});

function different(a,b) {
  var equivalency = 0;
  var minLength = (a.length > b.length) ? b.length : a.length;
  var maxLength = (a.length < b.length) ? b.length : a.length;
  for(var i = 0; i < minLength; i++) {
    if(a[i] == b[i]) {
      equivalency++;
    }
  }

  var weight = equivalency / maxLength;
  return 1 - weight;
}

//Validate Address
if (Shopify.Checkout.step == 'contact_information') {
  jQuery('.main__content>.step>.edit_checkout').submit((formSubmission) => {
    var validated = jQuery('#address-validator-popup').data('validated');

    if (!validated) {
      formSubmission.preventDefault();

      let countryField = document.getElementById('checkout_shipping_address_country');

      let shippingAddress = {
        firstName: document.getElementById('checkout_shipping_address_first_name').value,
        lastName: document.getElementById('checkout_shipping_address_last_name').value,
        address1: document.getElementById('checkout_shipping_address_address1').value,
        address2: document.getElementById('checkout_shipping_address_address2').value,
        company: document.getElementById('checkout_shipping_address_company').value,
        city: document.getElementById('checkout_shipping_address_city').value,
        countryCode: countryField[countryField.selectedIndex].getAttribute('data-code'),
        provinceCode: document.getElementById('checkout_shipping_address_province').value,
        zip: document.getElementById('checkout_shipping_address_zip').value,
        phone: document.getElementById('checkout_shipping_address_phone').value
      };

//       const request = new Request('https://api.frozendessertsupplies.company/validate-address', {
//       // const request = new Request('http://localhost:3000/validate-address', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json',
//       'SierraMadreApiKey':'qIwGg8q76B7yYvltPTYkkbnEviyFeW2sKsUpNcw8pu1JxX9BdVW9PipbmPXS5pU1' },
//         body: JSON.stringify(shippingAddress)
//       });

//       fetch(request)
//         .then(response => {
//           if (response.status === 200) {
//             response.json().then((parsedJson) => {
//               let candidates = [];
//               // Parse the Json strings to readable data. 
//               let addressCandidates = JSON.parse(parsedJson.finalCandidate);
//               let addressInfo = JSON.parse(parsedJson.finalAddressInfo);
//               let poBox = addressInfo.poBox;
//               // Loop through the possible Address candidates.
//             if(addressInfo.classification != "Foreign address"){ 
//               for (let candidate of addressCandidates) {
//                 let changes = [];
//                 let totalChangeWeight = 0;

//                 for (let property in candidate.address) {
//                   let changeWeight = different(
//                     shippingAddress[property].toUpperCase(),
//                     candidate.address[property].toUpperCase()
//                   );
//                   if (changeWeight > 0) {
//                     changes.push({field: property, weight: changeWeight});
//                     totalChangeWeight += changeWeight;
//                   }
//                 }

//                 if (totalChangeWeight === 0 && candidate.valid && poBox === false) {
//                   jQuery('#address-validator-popup').data('validated', true);
//                   formSubmission.currentTarget.submit(); // The current address is valid!
//                   return;
//                 } else {
//                   candidates.push({
//                     address: candidate.address,
//                     changes: changes,
//                     changeWeight: totalChangeWeight,
//                     valid: candidate.valid,
//                     invalidReason: candidate.invalidReason,
//                   });
//                 }
//               }
//             };

//               correctedAddresses = candidates;

//               let displayCandidates = false;
//               let message = '';
//               var secondAttempt = jQuery('#address-validator-popup').data('secondAttempt');

//               // Do not move forward if the address is a P.O Box.
//               if (poBox === true) {
//                 message = "We're sorry, we do not ship to P.O. Boxes as our shipments are too large. Please update your address and try again. If you have any issues please contact our customer service team.";
//                 secondAttempt = false;
//                 displayCandidates = false;
//               }

//               // if statement to move forward, warning the customer if they are using a foreign address
//               if (addressInfo.classification == "Foreign address") {
                
//                 message = "You seem to be shipping to a foreign address."
//                 secondAttempt = false;
//                 displayCandidates = false;
//                 jQuery('#address-validator-popup').data('validated', true);
//                 formSubmission.currentTarget.submit(); // The current address is valid!
//                 return;
//               }
            
//               // Open popup
//               jQuery('#address-validator-overlay').addClass('visible');

//               // Determine popup status
//               // this line of code, specifically the double )  brings about the original functionality!
//               if (candidates.length <= 0) {
//                 // console.log(`Address Candidates Length: ${candidates.length}`);
//                 secondAttempt = true;
//                 jQuery('#update-address').removeClass('visible');
//                 jQuery('#continue_button').removeClass('btn--loading');
//                 jQuery('#cancel-button').addClass('noCandidates');
//               } else {
//                 jQuery('#update-address').addClass('visible');
//                 jQuery('#cancel-button').removeClass('noCandidates');
//                 jQuery('#continue_button').removeClass('btn--loading');
//                 jQuery('#address-validator-popup .addresses>.original>.address')
//                   .replaceWith(addressValidatorGetShippingAddressHTML({address: shippingAddress}));

//               }
//               // Determine popup status
//               if (secondAttempt && candidates.length <= 0){
//                 jQuery('#proceed').addClass('visible');
//                 jQuery('#cancel-button').addClass('noCandidates');
//                 jQuery('.acknowledgement').addClass('visible');
//                 jQuery('#update-address').removeClass('visible');
//                 jQuery('#continue_button').removeClass('btn--loading');
//               } else if (secondAttempt) {
//                 jQuery('#cancel-button').removeClass('noCandidates');
//                 jQuery('#proceed').addClass('visible');
//                 jQuery('.acknowledgement').addClass('visible');
//                 jQuery('#update-address').addClass('visible');
//                 jQuery('#address-validator-overlay #address-validator-popup .dropdown-wrapper').removeClass('withButton');
//               }

//               if(candidates.length > 1 ){
//                 jQuery('#address-validator-overlay #drop-down').addClass('visible');
//                 jQuery('#address-validator-overlay #address-validator-popup .dropdown-wrapper').addClass('withButton');
//               } else {
//                 jQuery('#address-validator-overlay #drop-down').removeClass('visible');
//                 jQuery('#address-validator-overlay #address-validator-popup .dropdown-wrapper').removeClass('withButton');
//               }

//               if (candidates.length === 0) {
//                 // address validator was not able to find any matching addresses and the address is not a from the US or Puerto Rico.
//                 message = !secondAttempt ? 'Please update your address and try again.'
//                   : `Looks like our system can't correctly identify your complete address. If you proceed you may incur FedEx invalid address fees. If you are worried about this message and would like more clarification from the 
// Customer Solutions team please give us a call at (480)428-1999. Check this box if you would still like to proceed and be at risk of invalid address fees.`;
//               } else if (candidates.length === 1) {
//                 if (candidates[0].invalidReason === 'Address Line 2 is Missing partially or completely' || candidates[0].invalidReason === 'Address line 2 is missing an Apt/Unit number') {
//                   message = !secondAttempt ? 'You are missing an apartment/suite number. Please update your address and try again.'
//                     : `Looks like our system still can't correctly identify your complete address. If you proceed without updating you may incur FedEx invalid address fees. If you are worried about this message and would like more 
// clarification from the Customer Solutions team please give us a call at (480)428-1999. Check this box if you would still like to proceed and be at risk of invalid address fees.`;
                  
//                 } else if (candidates[0].invalidReason ==='Address Line 2 is present but is not correct' && poBox === false) {
//                   message = !secondAttempt ? 'Your apartment/suite number is incorrect please verify address and try again.'
//                     : `Looks like our system still can't correctly identify your complete address. If you proceed without updating you may incur FedEx invalid address fees. If you are worried about this message and would like more 
// clarification from the Customer Solutions team please give us a call at (480)428-1999. Check this box if you would still like to proceed and be at risk of invalid address fees.`;
                  
//                 } else if (candidates[0].changeWeight !== 0 && poBox === false) {
//                   jQuery('#address-validator-popup .candidates-wrapper>h4').text('Corrected address:');
//                   displayCandidates = true;
                  
//                 }
//               } else {  
//                 jQuery('#address-validator-popup .candidates-wrapper>h4').text('Corrected addresses:');
//                 displayCandidates = true;
//               };

//               if (displayCandidates) {
//                 message = !secondAttempt ? "To ensure prompt and accurate delivery, we suggest a modified shipping address. Click Update Address to select this suggestion."
//                   : `Looks like our system still can't correctly identify your complete address. If you proceed without updating you may incur FedEx invalid address fees. If you are worried about this message and would like more 
// clarification from the Customer Solutions team please give us a call at (480) 428-1999. Check this box if you would still like to proceed and be at risk of invalid address fees. Or click Update Address Below.`;
//                 jQuery('.addresses').addClass('visible');

//                 candidates.sort((lhs, rhs) => (lhs.changeWeight > rhs.changeWeight) ? 1 : -1);

//                 // jQuery('#address-validator-popup #candidates').empty();
//                 // jQuery('#address-validator-popup #candidates').append(
//                 //   candidates.map(candidate => addressValidatorGetShippingAddressHTML(candidate)).join('')
//                 // );

//                 jQuery('#address-validator-popup #candidates').empty();
//                 jQuery('#address-validator-popup #candidates').append(
//                   addressValidatorGetShippingAddressHTML(candidates[0]));

//                 jQuery('#myDropdown').append(candidates.slice(1, candidates.length).map(candidate => addressValidatorGetShippingAddressHTML(candidate)).join(''));

//                 // Close the dropdown menu if the user clicks outside of it
//                 window.onclick = function(event) {
//                   if (!event.target.matches('.dropbtn')) {
//                     var dropdowns = document.getElementsByClassName("dropdown-content");
//                     var i;
//                     for (i = 0; i < dropdowns.length; i++) {
//                       var openDropdown = dropdowns[i];
//                       if (openDropdown.classList.contains('show')) {
//                         openDropdown.classList.remove('show');
//                       }
//                     }
//                   }
//                 }

//                 // Highlight changes in candidate addresses
//                 jQuery('#address-validator-overlay #candidates .address').each((i, item) => {
//                   let dataString = jQuery(item).data('changes');
//                   let changes = JSON.parse(dataString.replace(/'/g, '"'));
//                   for (let change of changes) {
//                     jQuery(item).find(`.${change.field}`).addClass('displayChange');
//                   }
//                 });
//                 jQuery('#address-validator-overlay #candidates .address').hover(candidateHoverInHandler, candidateHoverOffHandler);
//                 jQuery('#address-validator-overlay #candidates .address').click(updateAddressFromClickAndSubmit);
//                 jQuery('#address-validator-overlay #update-address').click(updateAddressAndSubmit);
//                 jQuery('#address-validator-overlay #myDropdown .show .address').click(updateAddressFromClickAndSubmit);
                
//               }
              
//               jQuery('#address-validator-message').text(message);
//             });
//           } else {
//             throw new Error('Something went wrong on the api server!');
//           }
//         })
//         .catch(error => {
//           console.error(error);
          
//         });
    }

  });
}

// // For the checkout dropdown:
// // Close the dropdown menu if the user clicks outside of it
// window.addEventListener('click', function(event) {
//   if (!event.target.matches('#checkout-options-btn')) {
//     var dropdowns = document.getElementsByClassName('checkout-dropdown-options');
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show-checkout-option')) {
//         openDropdown.classList.remove('show-checkout-option');
//       }
//     }
//   }
// });

// CSS enjector function
function injectCSS(cssText) {
  const styleElement = document.createElement('style');

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssText;
  } else {
    styleElement.appendChild(document.createTextNode(cssText));
  }

  document.getElementsByTagName('head')[0].appendChild(styleElement);
}
