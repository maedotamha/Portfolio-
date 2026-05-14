'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validation';
import { AnimatedSection } from '../AnimatedSection';
import { FiSend, FiMail, FiGithub } from 'react-icons/fi';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitStatus('success'); reset(); }
      else setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3 bg-muted/60 border border-border rounded-xl text-foreground
    placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40
    transition-all duration-200 text-sm hover:border-primary/25`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgb(var(--primary)) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-12">
            <span className="section-num">06.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Get In Touch</h2>
            <div className="gradient-rule" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Left — copy */}
          <AnimatedSection animation="slideIn" delay={0.1}>
            <div className="md:col-span-2">
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                Have a project in mind or just want to say hello? I&apos;d love to hear from you.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:alemu.maedot@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground/60 hover:text-primary transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <FiMail className="w-3.5 h-3.5 text-primary" />
                  </span>
                  alemu.maedot@gmail.com
                </a>
                <a
                  href="https://github.com/maedot-alemu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-foreground/60 hover:text-primary transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <FiGithub className="w-3.5 h-3.5 text-primary" />
                  </span>
                  github.com/maedot-alemu
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection animation="slideUp" delay={0.15}>
            <div className="md:col-span-3">
              <div className="glow-card p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input {...register('name')} type="text" placeholder="Your name" className={inputClass} />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register('email')} type="email" placeholder="Your email" className={inputClass} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input {...register('subject')} type="text" placeholder="Subject" className={inputClass} />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Your message..."
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm text-center border border-emerald-500/20">
                      Message sent! I&apos;ll get back to you soon.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm text-center border border-red-500/20">
                      Something went wrong. Please email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl
                               flex items-center justify-center gap-2
                               hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5
                               transition-all duration-200 disabled:opacity-50
                               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <FiSend className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
