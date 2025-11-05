# 📧 Konfiguracja formularza kontaktowego z Resend

Formularz kontaktowy jest już zaimplementowany i gotowy do użycia. Potrzebujesz tylko skonfigurować konto Resend i dodać zmienne środowiskowe.

---

## 🚀 Kroki konfiguracji

### 1. Utwórz konto w Resend

1. Wejdź na stronę: **https://resend.com/signup**
2. Zarejestruj się (możesz użyć GitHub, Google lub email)
3. Po zalogowaniu przejdź do dashboardu

---

### 2. Uzyskaj klucz API

1. W dashboardzie Resend kliknij **"API Keys"** w menu bocznym
2. Kliknij **"Create API Key"**
3. Nadaj nazwę kluczu (np. "Osiedle Olimpijczykow Production")
4. **Skopiuj klucz API** - będzie wyświetlony tylko raz!
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 3. Skonfiguruj zmienne środowiskowe

Otwórz plik `.env.local` w głównym katalogu projektu i zaktualizuj:

```env
# Resend API Configuration
RESEND_API_KEY=re_TwojPrawdziwyKluczZResend

# Email na który będą przychodzić wiadomości
CONTACT_EMAIL_RECIPIENT=twoj-email@przyklad.pl
```

**WAŻNE:**
- Zamień `re_TwojPrawdziwyKluczZResend` na prawdziwy klucz z Resend
- Zamień `twoj-email@przyklad.pl` na adres email, na który mają przychodzić wiadomości z formularza

---

### 4. Zrestartuj serwer deweloperski

Po dodaniu zmiennych środowiskowych, zrestartuj Next.js:

```bash
# Zatrzymaj serwer (Ctrl+C) i uruchom ponownie:
npm run dev
```

---

## ✅ Testowanie

1. Otwórz stronę w przeglądarce
2. Przewiń do sekcji "Skontaktuj się z nami"
3. Wypełnij formularz:
   - Imię
   - Email
   - Telefon (opcjonalnie)
   - Wiadomość
4. Kliknij **"Wyślij"**
5. Powinieneś zobaczyć:
   - Komunikat sukcesu: ✓ "Wiadomość została wysłana pomyślnie!"
   - Email na adresie w `CONTACT_EMAIL_RECIPIENT`

---

## 📊 Darmowy plan Resend

✅ **3,000 emaili/miesiąc**
✅ **100 emaili/dzień**
✅ **Bez karty kredytowej**

Więcej niż wystarczające dla strony z mieszkaniami!

---

## 🎨 Wygląd emaila

Email wysłany z formularza zawiera:
- ✉️ Dane kontaktowe osoby wypełniającej formularz
- 📝 Treść wiadomości w czytelnym formacie
- 🔁 Możliwość bezpośredniej odpowiedzi (Reply-To)
- 🎨 Profesjonalny design w kolorach strony

---

## 🔧 (Opcjonalnie) Własna domena email

Domyślnie emaile są wysyłane z `onboarding@resend.dev`.

Aby używać własnej domeny (np. `kontakt@osiedleolimpijczykow.pl`):

1. W Resend dashboard kliknij **"Domains"**
2. Kliknij **"Add Domain"**
3. Podaj swoją domenę (np. `osiedleolimpijczykow.pl`)
4. Dodaj rekordy DNS zgodnie z instrukcjami
5. Po weryfikacji zmień w pliku `app/api/contact/route.js`:

```javascript
from: "Osiedle Olimpijczyków <kontakt@osiedleolimpijczykow.pl>",
```

---

## 🐛 Rozwiązywanie problemów

### Email nie przychodzi?

1. **Sprawdź folder SPAM** - Resend może początkowo trafiać do spamu
2. **Sprawdź logi w konsoli** - otwórz DevTools (F12) i sprawdź zakładkę Console
3. **Sprawdź logi Resend** - w dashboardzie Resend → "Logs" zobaczysz wszystkie wysłane maile

### Błąd "Konfiguracja serwera jest nieprawidłowa"?

- Sprawdź czy ustawiłeś `CONTACT_EMAIL_RECIPIENT` w `.env.local`
- Zrestartuj serwer Next.js

### Błąd "Invalid API key"?

- Sprawdź czy skopiowałeś cały klucz API z Resend
- Upewnij się, że klucz zaczyna się od `re_`
- Zrestartuj serwer Next.js

---

## 📞 Wsparcie

- **Dokumentacja Resend**: https://resend.com/docs
- **Status Resend**: https://status.resend.com/
- **Dashboard Resend**: https://resend.com/overview

---

## 🔒 Bezpieczeństwo

✅ Klucz API jest **bezpiecznie przechowywany** w `.env.local`
✅ Plik `.env.local` jest **ignorowany przez Git** (znajduje się w `.gitignore`)
✅ Walidacja danych wejściowych po stronie serwera
✅ Rate limiting dostępny w Resend dashboard

**NIGDY NIE COMMITUJ** pliku `.env.local` do repozytorium!

---

Gotowe! 🎉 Twój formularz kontaktowy jest w pełni funkcjonalny.
